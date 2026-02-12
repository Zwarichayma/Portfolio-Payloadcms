'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  delay?: number
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay: _delay = 0 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [currentIndex, text])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="border-r-2 border-blue-600 ml-1"
      />
    </span>
  )
}