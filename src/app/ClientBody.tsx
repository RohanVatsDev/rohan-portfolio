"use client";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </body>
  );
}
