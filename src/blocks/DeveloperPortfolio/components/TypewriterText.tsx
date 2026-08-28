'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  delay?: number
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 500 }) => {
  const [displayText, setDisplayText] = useState('')
  const [started, setStarted] = useState(false)

  // Wait for the hero entrance animation before starting to type so the
  // typing effect is clearly visible.
  useEffect(() => {
    const start = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(start)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayText.length < text.length) {
      const t = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1))
      }, 120)
      return () => clearTimeout(t)
    }
  }, [started, displayText, text])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="border-r-2 ml-1"
        style={{ borderColor: '#7c3aed' }}
      />
    </span>
  )
}
