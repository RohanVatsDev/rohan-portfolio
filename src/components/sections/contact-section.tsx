"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="h-6 w-6" />,
    url: "https://github.com/RohanVatsDev",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-6 w-6" />,
    url: "https://linkedin.com/in/rohan-vats",
  },
  {
    name: "Email",
    icon: <Mail className="h-6 w-6" />,
    url: "mailto:rohanvatscse2025@gmail.com",
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      setIsSubmitted(true);
      setTimeout(() => {
        setFormState({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential collaborations? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-neon"></div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 text-primary p-4 rounded-md flex items-center"
                >
                  <Send className="mr-3 h-5 w-5" />
                  <p>Thanks for your message! I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      <span>{formError}</span>
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Rohan Vats"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="rohanvats2020@gmail.com"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Hello, I'd like to discuss a project..."
                      className="w-full px-4 py-3 rounded-md border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-6 bg-primary hover:bg-primary/90 glow-on-hover"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-8">Connect With Me</h3>
            <div className="space-y-8">
              {socialLinks.map((social) => (
                <div key={social.name} className="relative">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1"
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      {social.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{social.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {social.url.replace("mailto:", "")}
                      </p>
                    </div>
                  </a>
                  {hoveredSocial === social.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute right-0 top-0 -mt-2 transform translate-x-full ml-4 bg-card rounded-lg p-3 shadow-lg border border-border z-10"
                    >
                      <QRCode value={social.url} size={128} className="rounded-md" />
                      <p className="text-xs text-center mt-2">Scan to connect</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-2">© 2025 Rohan Vats</p>
              <p className="flex items-center justify-center text-primary-foreground">
                <span className="animate-pulse">👨‍💻</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
