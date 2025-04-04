"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-secondary/10 to-secondary/40"
    >
      {/* NEW: Innovative particulate background layer */}
      <ParticlesBackground />

      {/* Existing animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              filter: "blur(8px)",
            }}
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 150 - 75],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          style={{ opacity }}
        >
          {/* Avatar Image with advanced animations */}
          <motion.div
            ref={imageRef}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            style={{ y, scale }}
          >
            {/* Decorative animated circles */}
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-dashed border-primary/40"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ 
                rotate: -360,
                scale: [1, 0.95, 1],
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            />

            {/* Contact Items positioned around the avatar */}
            <ContactItem 
              Icon={Mail} 
              text="contact@rohanvats.com" 
              href="mailto:contact@rohanvats.com"
              position="top"
              className="opacity-0 group-hover:opacity-100"
            />
            <ContactItem 
              Icon={Phone} 
              text="+91 234 567 8900" 
              href="tel:+912345678900"
              position="right"
              className="opacity-0 group-hover:opacity-100"
            />
            <ContactItem 
              Icon={MapPin} 
              text="New Delhi, India" 
              position="bottom"
              className="opacity-0 group-hover:opacity-100"
            />
            <ContactItem 
              Icon={Github} 
              text="GitHub" 
              href="https://github.com/"
              position="left"
              className="opacity-0 group-hover:opacity-100"
            />
            <ContactItem 
              Icon={Linkedin} 
              text="LinkedIn" 
              href="https://linkedin.com/"
              position="top-right"
              className="opacity-0 group-hover:opacity-100"
            />
            <ContactItem 
              Icon={Twitter} 
              text="Twitter" 
              href="https://twitter.com/"
              position="bottom-left"
              className="opacity-0 group-hover:opacity-100"
            />

            {/* Image container with overlay effects */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg shadow-primary/20 transition-all duration-300">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/50 z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              
              <Image
                src="/images/dp.png?text=RV"
                alt="Rohan Vats"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110 rounded-full"
              />

              <motion.div 
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center z-20 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="font-bold text-xl text-white">Rohan Vats</h3>
                <p className="text-sm text-white/80">Software Developer</p>
              </motion.div>
            </div>
            
            {/* Floating particles around the avatar */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-primary"
                style={{
                  top: `${50 + Math.cos((i / 6) * Math.PI * 2) * 45}%`,
                  left: `${50 + Math.sin((i / 6) * Math.PI * 2) * 45}%`,
                }}
                animate={{
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Bio Content with animated headings and paragraphs */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary">About</span> Me
              <motion.div 
                className="h-1 bg-primary mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.h2>

            <motion.p 
              className="text-foreground/80 mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I'm a passionate software developer specializing in developing intelligent software solutions. With expertise in Python, Java, Django, and AI/ML technologies, I create efficient, scalable applications that solve real-world problems.
            </motion.p>

            <motion.p 
              className="text-foreground/80 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              My journey in technology began with a fascination for how software can transform ideas into impactful tools. Today, I combine technical skills with creative problem-solving to build innovative solutions that make a difference.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <InfoCard title="Education" content="B.Tech in Computer Science" subcontent="2019 - 2023" />
              <InfoCard title="Experience" content="Software Developer Intern" subcontent="2022 - Present" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// New ParticlesBackground component
function ParticlesBackground() {
  const particleCount = 20;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2, // Size between 2px and 6px
    duration: Math.random() * 10 + 5, // Duration between 5s and 15s
    delay: Math.random() * 5,
    xRange: Math.random() * 100 - 50,
    yRange: Math.random() * 100 - 50,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.xRange, 0],
            y: [0, p.yRange, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ContactItem component for positioning contact icons around the avatar
function ContactItem({ Icon, text, href, position, className = "" }) {
  const positionStyles = {
    top: "absolute -top-16 left-1/2 -translate-x-1/2 transition-all duration-500 group-hover:-top-20",
    right: "absolute top-1/2 -translate-y-1/2 -right-16 transition-all duration-500 group-hover:-right-20",
    bottom: "absolute -bottom-16 left-1/2 -translate-x-1/2 transition-all duration-500 group-hover:-bottom-20",
    left: "absolute top-1/2 -translate-y-1/2 -left-16 transition-all duration-500 group-hover:-left-20",
    "top-right": "absolute -top-12 -right-12 transition-all duration-500 group-hover:-top-16 group-hover:-right-16",
    "top-left": "absolute -top-12 -left-12 transition-all duration-500 group-hover:-top-16 group-hover:-left-16",
    "bottom-right": "absolute -bottom-12 -right-12 transition-all duration-500 group-hover:-bottom-16 group-hover:-right-16",
    "bottom-left": "absolute -bottom-12 -left-12 transition-all duration-500 group-hover:-bottom-16 group-hover:-left-16",
  };

  const animationOrder = {
    top: 0,
    "top-right": 1,
    right: 2,
    "bottom-right": 3,
    bottom: 4,
    "bottom-left": 5,
    left: 6,
    "top-left": 7,
  };

  const delay = animationOrder[position] * 0.05;

  const containerClasses = `${positionStyles[position]} ${className} transition-opacity duration-300 flex flex-col items-center z-30`;

  const Content = () => (
    <>
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg shadow-primary/20 mb-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 1] }}
        transition={{ duration: 0.5, delay }}
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.6)",
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <motion.span
        className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
      >
        {text}
      </motion.span>
    </>
  );

  return href ? (
    <a href={href} className={containerClasses}>
      <Content />
    </a>
  ) : (
    <div className={containerClasses}>
      <Content />
    </div>
  );
}

// InfoCard component with animated border and glow effect
function InfoCard({ title, content, subcontent }) {
  return (
    <motion.div
      className="relative p-6 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden group"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <motion.div
            className="absolute h-[500%] w-[500%]"
            style={{
              top: "-200%",
              left: "-200%",
            }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                width: "20%",
                height: "20%",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(var(--primary-rgb), 0.8) 50%, rgba(0,0,0,0) 100%)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Inner glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-primary/0"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 0.1,
          boxShadow: "inset 0 0 20px rgba(var(--primary-rgb), 0.4)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <motion.h3
          className="text-xl font-bold text-primary mb-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        <p className="text-foreground/80">{content}</p>
        <p className="text-muted-foreground">{subcontent}</p>
      </div>
    </motion.div>
  );
}
