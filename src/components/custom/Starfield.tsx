'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/Theme'

interface StarfieldProps {
  count?: number
}

export const Starfield: React.FC<StarfieldProps> = ({ count = 120 }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1.5,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        bright: Math.random() > 0.55,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.09) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: isDark ? '#e0e7ff' : '#7c3aed',
            boxShadow: `0 0 ${s.bright ? 8 : 4}px ${
              isDark ? 'rgba(199,210,254,0.9)' : 'rgba(124,58,237,0.55)'
            }`,
          }}
          animate={{ opacity: [0.25, s.bright ? 1 : 0.7, 0.25] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
