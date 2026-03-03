"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type ThemeName = "retro" | "cyberpunk" | "fantasy" | "terminal"

interface ThemeConfig {
  name: ThemeName
  label: string
  icon: string
  description: string
}

export const themes: ThemeConfig[] = [
  { name: "retro", label: "RETRO", icon: "[8-BIT]", description: "Classic arcade vibes" },
  { name: "cyberpunk", label: "CYBER", icon: "[NEON]", description: "Neon-soaked future" },
  { name: "fantasy", label: "QUEST", icon: "[RPG]", description: "Epic fantasy realm" },
  { name: "terminal", label: "TERM", icon: "[CLI]", description: "Hacker terminal" },
]

interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "retro",
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("retro")

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
