'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SectionLabelProps {
  code?: string | null
  className?: string
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ code, className }) => {
  if (!code) return null

  return (
    <motion.span
      className={`inline-block mb-3 text-xs px-3 py-1 rounded ${className || ''}`}
      style={{
        background: 'rgba(124,58,237,0.12)',
        color: '#a78bfa',
        border: '1px solid rgba(124,58,237,0.2)',
        fontFamily: "'JetBrains Mono', monospace",
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      {code}
    </motion.span>
  )
}
