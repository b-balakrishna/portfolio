"use client"

import { useEffect, useRef } from "react"

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(400px at ${e.clientX}px ${e.clientY}px, hsl(var(--primary) / 0.05), transparent 80%)`
      }
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      aria-hidden="true"
    />
  )
}
