"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Play, X } from "lucide-react";

// Project data type and sample projects
type Project = {
  id: string;
  title: string;
  description: string;
  category: "volunteer" | "internship";
  video: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    download?: string;
  };
  keyFeatures: string[];
};

const projects: Project[] = [
  {
    id: "smart-farm",
    title: "Smart Farm Network Portal",
    description:
      "A complete solution for farmers to connect and streamline the supply chain from farm to table.",
    category: "volunteer",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    technologies: ["Python (Flask)", "MySQL", "JavaScript", "HTML", "CSS"],
    links: {
      github: "https://github.com/rohanvats/smart-farm",
      demo: "https://smart-farm-demo.com",
    },
    keyFeatures: [
      "User management system",
      "Product catalog",
      "Order tracking",
      "Financial reporting",
    ],
  },
  {
    id: "ngo-database",
    title: "NGO Database Management",
    description:
      "Comprehensive database management system with 19 interconnected tables for complex NGO data.",
    category: "volunteer",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    technologies: ["Python", "SQL", "JavaScript"],
    links: {
      github: "https://github.com/rohanvats/ngo-database",
    },
    keyFeatures: [
      "ER diagram visualization",
      "Data integrity checks",
      "Efficient querying",
      "Complex data relationships",
    ],
  },
  {
    id: "sign-language-app",
    title: "Basic Sign Language App",
    description:
      "Android application that improves communication access for the hearing impaired through sign language recognition.",
    category: "volunteer",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    technologies: ["Android Studio", "Java", "XML"],
    links: {
      github: "https://github.com/rohanvats/sign-language-app",
      download: "https://sign-language-app.com/download",
    },
    keyFeatures: [
      "Sign language recognition",
      "Text-to-speech conversion",
      "User-friendly interface",
      "Offline functionality",
    ],
  },
  {
    id: "sentiment-analysis",
    title: "Social Media Sentiment Analysis",
    description:
      "Real-time sentiment analysis system using BERT for NLP, achieving 97% accuracy after training on 1.6 million tweets.",
    category: "internship",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    technologies: ["Python", "BERT", "Flask API", "HTML/CSS/JS"],
    links: {
      demo: "https://sentiment-demo.rohanvats.com",
    },
    keyFeatures: [
      "Real-time data processing",
      "Natural language processing",
      "User-friendly web interface",
      "High accuracy predictions",
    ],
  },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "volunteer" | "internship">("all");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "volunteer", label: "Volunteer Projects" },
    { value: "internship", label: "Internship Projects" },
  ];

  const flipCard = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-secondary/30 to-secondary/10 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my skills and experience in software development, AI, and web applications.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.value as any)}
                className={`px-6 ${activeCategory === cat.value ? "bg-primary" : "hover:bg-primary/10"}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-[450px] w-full perspective"
            >
              <div
                className={`relative w-full h-full transform-style-3d transition-transform duration-700 cursor-pointer ${
                  flippedCards[project.id] ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                  <div className="relative h-1/2 w-full overflow-hidden">
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <button
                      className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideo(project.id);
                      }}
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-secondary/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <button
                      onClick={() => flipCard(project.id)}
                      className="absolute bottom-6 right-6 group flex items-center gap-2 text-sm text-primary hover:text-primary/90 transition-all"
                    >
                      <span className="group-hover:underline">Flip for details</span>
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <path
                          d="M13 9L16 12M16 12L13 15M16 12H8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </button>
                  </div>
                </div>
                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-card rounded-xl shadow-lg border border-primary p-6 flex flex-col">
                  <button
                    onClick={() => flipCard(project.id)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <h3 className="text-2xl font-bold mb-4 text-primary">{project.title}</h3>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-2">
                      {project.keyFeatures.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {project.links.github && (
                      <Button variant="outline" size="sm" asChild className="gap-1">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.links.demo && (
                      <Button variant="default" size="sm" asChild className="gap-1">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.links.download && (
                      <Button variant="secondary" size="sm" asChild className="gap-1">
                        <a href={project.links.download} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-5xl mx-auto h-full md:h-auto md:aspect-video">
            <button
              className="absolute top-4 right-4 z-10 text-white p-2 bg-black/50 rounded-full hover:bg-primary/80 transition-colors"
              onClick={() => setActiveVideo(null)}
            >
              <X className="h-8 w-8" />
            </button>
            {projects
              .filter((project) => project.id === activeVideo)
              .map((project) => (
                <video
                  key={project.id}
                  src={project.video}
                  autoPlay
                  controls
                  className="w-full h-full object-contain rounded-lg"
                />
              ))}
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
