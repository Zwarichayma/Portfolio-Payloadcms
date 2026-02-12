'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-600/30 dark:bg-blue-400/30 rounded-full transition-colors duration-300"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  )
}