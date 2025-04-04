"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, MoveRight, Code, Download } from "lucide-react";
import * as THREE from "three";

// Mock Button Component (replace with your actual Button if available)
const Button = ({ children, variant, size, className, asChild, ...props }) => {
  const Tag = asChild ? motion.a : motion.button;
  const baseStyle =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const sizeStyle = size === "lg" ? "h-11 px-8 py-3 text-lg" : "h-10 px-4 py-2";
  const variantStyle =
    variant === "outline"
      ? "border border-input hover:bg-accent hover:text-accent-foreground backdrop-blur-sm"
      : "bg-primary text-primary-foreground hover:bg-primary/90";
  const combinedClassName = `${baseStyle} ${sizeStyle} ${variantStyle} ${className || ""}`;
  const motionProps = {
    whileHover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
    whileTap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <Tag className={combinedClassName} {...motionProps} {...props}>
      {children}
    </Tag>
  );
};

// CosmicBackground renders a dynamic starry background using Three.js
const CosmicBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const currentRef = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      2000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    currentRef.appendChild(renderer.domElement);

    const starLayers = [
      { count: 2000, size: 0.06, speedFactor: 0.00005, zRange: 1000 },
      { count: 1500, size: 0.08, speedFactor: 0.00008, zRange: 800 },
      { count: 1000, size: 0.1, speedFactor: 0.0001, zRange: 600 },
    ];
    const starGroups = [];

    starLayers.forEach((layer) => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: layer.size,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });
      const starVertices = [];
      for (let i = 0; i < layer.count; i++) {
        const radius = Math.random() * layer.zRange;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        if (Math.sqrt(x * x + y * y + z * z) > 5) {
          starVertices.push(x, y, z);
        } else {
          const scaleFactor = 10 / Math.sqrt(x * x + y * y + z * z);
          starVertices.push(x * scaleFactor, y * scaleFactor, z * scaleFactor);
        }
      }
      starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      starGroups.push({ points: stars, speedFactor: layer.speedFactor });
    });

    const handleResize = () => {
      if (!currentRef) return;
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: 0, y: 0 };
    const targetCameraOffset = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      if (!currentRef) return;
      targetCameraOffset.x = (event.clientX / currentRef.clientWidth) * 2 - 1;
      targetCameraOffset.y = -(event.clientY / currentRef.clientHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      starGroups.forEach((group) => {
        group.points.rotation.y += group.speedFactor;
        group.points.rotation.x += group.speedFactor * 0.5;
      });
      camera.position.x += (targetCameraOffset.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (targetCameraOffset.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (currentRef && renderer.domElement) {
        try {
          currentRef.removeChild(renderer.domElement);
        } catch (e) {
          console.warn("Could not remove renderer DOM element:", e);
        }
      }
      starGroups.forEach((group) => {
        group.points.geometry?.dispose();
        group.points.material?.dispose();
      });
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-black"
    />
  );
};

// HeroSection Component with animated titles, CTAs, and a cosmic background
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="relative min-h-screen w-full bg-black" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Resume file configuration (ensure the file exists in /public)
  const resumeFilename = "Rohan_Vats_Resume.pdf";
  const resumeDownloadName = "Rohan_Vats_Resume.pdf";

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8"
    >
      <CosmicBackground />

      <motion.div
        className="container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto flex-grow justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          style={{ textShadow: "0 0 25px rgba(59, 130, 246, 0.4)" }}
          variants={itemVariants}
        >
          Rohan Vats
        </motion.h1>

        <motion.p className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-8 font-light" variants={itemVariants}>
          Software Developer & Creative Technologist
        </motion.p>

        <motion.h2 className="text-md sm:text-lg md:text-xl text-slate-400 mb-10 max-w-xl" variants={itemVariants}>
          Turning complex problems into elegant software solutions using Python, Java, and modern web technologies.
        </motion.h2>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6" variants={itemVariants}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-600/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            asChild
            href={`/${resumeFilename}`}
            download={resumeDownloadName}
          >
            <>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-slate-500 text-slate-300 hover:bg-slate-800/60 hover:border-slate-400 hover:text-white backdrop-blur-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            asChild
            href="#contact"
          >
            <>
              <MoveRight className="mr-2 h-5 w-5" />
              Get In Touch
            </>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
        >
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="h-6 w-6 text-slate-400 hover:text-slate-200 transition-colors" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
