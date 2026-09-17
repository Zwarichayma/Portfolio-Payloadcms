'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface ParticlesProps {
  count?: number
  className?: string
}

export const Particles: React.FC<ParticlesProps> = ({ count = 20, className = '' }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3.5 + 2,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 4,
        drift: Math.random() * 40 - 20,
      })),
    [count],
  )

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: 'rgba(124,58,237,0.55)',
            boxShadow: '0 0 6px rgba(124,58,237,0.45)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.drift, 0],
            opacity: [0.25, 0.8, 0.25],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
