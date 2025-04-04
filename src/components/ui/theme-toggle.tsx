"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 bg-secondary"
    >
      <motion.div
        initial={{ scale: 0.6, rotate: 0 }}
        animate={{
          scale: 1,
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6
        }}
        className="w-full h-full flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Moon className="absolute h-5 w-5 text-primary" />
        ) : (
          <Sun className="absolute h-5 w-5 text-primary" />
        )}
      </motion.div>
    </Button>
  )
}
