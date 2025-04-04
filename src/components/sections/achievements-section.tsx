"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Users, Award, Calendar } from "lucide-react";

// Achievement data
const achievements = [
  {
    year: "2024",
    title: "Winner – Agoric Fast Hack",
    description: "🏆 Won ₹30,025 (350$) at my first-ever hackathon! A 36-hour marathon of coding and teamwork that taught me the power of perseverance. Pushed through challenges with my amazing team and claimed victory at midnight!",
    icon: <Trophy className="h-10 w-10 text-primary" />,
  },
  {
    year: "2024",
    title: "Top 40 – Code Conquest 1.0",
    description: "Secured All India Rank 40 in Code Conquest 1.0, a national-level coding challenge among 5000+ participants. Solved tough algorithmic problems with focus and consistency.",
    icon: <Award className="h-10 w-10 text-primary" />,
  },
  {
    year: "2024",
    title: "Google AI Event Attendee",
    description: "Attended the 'Build with AI' event by Google Developers Group. Explored Google Cloud, Gemini, and Gen App Builder. Networked with AI enthusiasts and professionals from diverse domains.",
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    year: "2023",
    title: "Coding Club Leadership",
    description: "Led my college’s Coding Club in 2023, growing it from 15 to 60+ members. Conducted weekly problem-solving sessions, hackathons, and peer-to-peer learning activities.",
    icon: <Users className="h-10 w-10 text-primary" />,
    count: 60,
  },
];


export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Achievements & <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlighting key milestones in my career journey that showcase my technical abilities and leadership qualities.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

          {/* Timeline Items */}
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className={`relative mb-12 flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-10 text-right" : "pl-10"}`}>
                <motion.div
                  className="bg-card p-6 rounded-lg shadow-md border border-border hover:border-primary/40 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-3 gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{achievement.year}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>

                  {achievement.count && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Members</p>
                      <motion.div
                        className="text-3xl font-bold text-primary"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <CountUp end={achievement.count} />+
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-background border-4 border-primary">
                {achievement.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple counter animation component
function CountUp({ end }: { end: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000; // 2 seconds

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(progress * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end]);

  return <span ref={nodeRef}>{count}</span>;
}
