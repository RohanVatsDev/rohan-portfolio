"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, MessageSquare } from "lucide-react";
import ParticlesBackground from "../animations/particles-background";

const codeSnippets = [
  `// Python AI Code
from tensorflow import keras
import numpy as np

def build_model():
  model = keras.Sequential([
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
  ])
  return model`,
  `// React Component
import { useState, useEffect } from 'react';

function DataVisualizer({ data }) {
  const [processed, setProcessed] = useState([]);
  
  useEffect(() => {
    const result = data.map(item => ({
      ...item,
      value: calculateMetric(item.raw)
    }));
    setProcessed(result);
  }, [data]);

  return (
    <div className="viz-container">
      {processed.map(item => (
        <ChartElement key={item.id} data={item} />
      ))}
    </div>
  );
}`,
  `// Java Backend Code
import java.util.List;
import java.util.stream.Collectors;

public class DataProcessor {
  
  public List<ResultData> processInputs(List<InputData> inputs) {
    return inputs.stream()
      .filter(input -> input.isValid())
      .map(this::transformData)
      .collect(Collectors.toList());
  }
  
  private ResultData transformData(InputData input) {
    // Complex transformation logic
    return new ResultData(input);
  }
}`,
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState([]);
  
  useEffect(() => {
    setMounted(true);
    // Generate three non-overlapping random positions in distinct quadrants
    setPositions([
      {
        // Top-left quadrant (avoid center)
        top: Math.floor(Math.random() * 20 + 5) + "%",
        left: Math.floor(Math.random() * 20 + 5) + "%",
      },
      {
        // Top-right quadrant
        top: Math.floor(Math.random() * 20 + 5) + "%",
        left: Math.floor(Math.random() * 20 + 75) + "%",
      },
      {
        // Bottom-left quadrant
        top: Math.floor(Math.random() * 20 + 75) + "%",
        left: Math.floor(Math.random() * 20 + 5) + "%",
      },
    ]);
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: "100vh" }} />;
  }

  // Floating animation that runs continuously
  const floatAnimation = {
    animate: {
      x: [0, 10, 0, -10, 0],
      y: [0, -10, 0, 10, 0],
    },
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background particle animation */}
      <ParticlesBackground />

      {/* Code snippet blocks */}
      {positions.length === 3 && (
        <>
          {codeSnippets.map((snippet, i) => (
            <motion.div
              key={i}
              drag
              dragMomentum={false} // prevents snapping back after drag
              className="absolute hidden md:block"
              style={{
                top: positions[i].top,
                left: positions[i].left,
                zIndex: 1,
                pointerEvents: "auto",
              }}
              whileHover={{ scale: 1.05, opacity: 0.9 }}
            >
              {/* Inner container applies a gentle floating animation */}
              <motion.div
                {...floatAnimation}
                className="max-w-sm p-4 bg-background/20 backdrop-blur-md rounded-lg shadow-lg border border-primary/20"
                style={{
                  boxShadow: "0 0 20px rgba(51, 102, 255, 0.2)",
                }}
              >
                <pre className="text-xs text-foreground/70 overflow-hidden whitespace-pre-wrap">
                  <code>{snippet}</code>
                </pre>
              </motion.div>
            </motion.div>
          ))}
        </>
      )}

      {/* Main hero content */}
      <motion.div
        className="container relative z-10 flex flex-col items-center text-center px-6"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className="animated-gradient-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #3366ff, #36d1dc, #5b86e5, #3366ff)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(51, 102, 255, 0.5)",
            }}
          >
            Building Code, Crafting Solutions
          </span>
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Software Developer | AI & Full-Stack Innovator
          </span>
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 glow-on-hover shadow-lg shadow-primary/20"
            asChild
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Github className="mr-2 h-5 w-5" />
              Explore Projects
            </motion.a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 shadow-lg"
            asChild
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Me
            </motion.a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
