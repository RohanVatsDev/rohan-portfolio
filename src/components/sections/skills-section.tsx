"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  icon: string;
  color: string;
};

const skillsData: Skill[] = [
  // Programming Languages
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#EA2D2E" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "#A8B9CC" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
  
  // Web Development
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "#092E20" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", color: "#000000" },
  {
    name: "Tailwind CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    color: "#06B6D4"
  },
  { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
  
  // Libraries & Tools
  { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", color: "#5C3EE8" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", color: "#150458" },
  { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", color: "#013243" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", color: "#007ACC" },
  { name: "IntelliJ IDEA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", color: "#000000" },
  { name: "PyCharm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg", color: "#000000" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", color: "#3DDC84" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
];

export default function SkillsSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Cleanup on unmount
    return () => setIsMounted(false);
  }, []);

  // Generate random positions for floating animation
  const generateRandomPositions = () => {
    return skillsData.map(() => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      scale: 0.9 + Math.random() * 0.3,
      rotation: Math.random() * 20 - 10,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 8
    }));
  };

  const [randomPositions, setRandomPositions] = useState(generateRandomPositions());

  const getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gradient-to-br from-background to-secondary/20">
      {/* Background floating circles */}
      {isMounted && [...Array(20)].map((_, index) => {
        const size = getRandomValue(30, 80);
        const opacity = getRandomValue(0.03, 0.08);
        const duration = getRandomValue(20, 60);
        
        return (
          <motion.div
            key={`circle-${index}`}
            className="absolute rounded-full bg-primary"
            style={{
              width: size,
              height: size,
              opacity: opacity,
              top: `${getRandomValue(0, 100)}%`,
              left: `${getRandomValue(0, 100)}%`,
            }}
            animate={{
              x: [getRandomValue(-100, 100), getRandomValue(-100, 100)],
              y: [getRandomValue(-100, 100), getRandomValue(-100, 100)],
              scale: [1, getRandomValue(1.2, 1.8), 1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: duration,
              ease: "easeInOut",
            }}
          />
        );
      })}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Floating All Over */}
        <motion.div 
          className="relative h-[500px] md:h-[600px] w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {skillsData.map((skill, index) => {
            // Distribute skills randomly across the entire section
            const posX = 10 + (index % 5) * 20 + (Math.random() * 10 - 5);
            const posY = 10 + Math.floor(index / 5) * 25 + (Math.random() * 10 - 5);
            const positions = randomPositions[index];
            
            return (
              <motion.div
                key={skill.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                animate={{
                  x: [positions.x, -positions.x, positions.x],
                  y: [positions.y, -positions.y, positions.y],
                  rotate: [positions.rotation, -positions.rotation, positions.rotation],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: positions.duration,
                  delay: positions.delay,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="flex flex-col items-center cursor-pointer"
                  whileHover={{ 
                    scale: 1.15, 
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="relative p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-lg flex flex-col items-center justify-center h-24 w-24 md:h-28 md:w-28">
                    <motion.div 
                      className="absolute inset-0 rounded-xl opacity-0"
                      style={{ backgroundColor: skill.color }}
                      whileHover={{ 
                        opacity: 0.1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                      whileHover={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                        transition: { 
                          duration: 0.5,
                          times: [0, 0.2, 0.8, 1]
                        }
                      }}
                    />
                    <p className="text-sm md:text-base font-medium mt-2 text-center">{skill.name}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Multiple smaller orbs spread across */}
          {[...Array(5)].map((_, i) => {
            const posX = 15 + (i * 20);
            const posY = 20 + (i % 3) * 25;
            
            return (
              <motion.div
                key={`orb-${i}`}
                className="absolute z-0"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.3 + (i * 0.2) }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-2xl" />
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-500 opacity-10"
                    animate={{ 
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ 
                      duration: 3 + (i * 0.7),
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}