'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import type { SkillsBlock } from '@/payload-types'

type Skill = NonNullable<SkillsBlock['skills']>[0]

interface ProgressBarProps {
  skill: Skill
  gradientColor: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ skill }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const progress = Math.min(100, Math.max(0, skill.percentage || 0))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl will-change-transform p-5"
      style={{
        backgroundColor: isDark ? 'rgba(23,20,42,0.6)' : 'rgba(255,255,255,0.7)',
        borderColor: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 1px 2px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.03)'
          : '0 1px 2px 0 rgb(0 0 0 / 0.03), inset 0 1px 0 0 rgb(255 255 255 / 0.8)',
        transition:
          'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
      }}
      whileHover={{
        y: -4,
        boxShadow: isDark
          ? '0 20px 40px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 0 rgba(255,255,255,0.05)'
          : '0 20px 40px -12px rgb(0 0 0 / 0.08), 0 0 0 1px rgba(124,58,237,0.15), inset 0 1px 0 0 rgba(255,255,255,0.9)',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
        style={{
          background: isDark
            ? `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.06), transparent 60%)`
            : `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.04), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-3 mb-3">
        {skill.icon && (
          <div
            className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: isDark ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <Media resource={skill.icon} className="w-8 h-8 object-contain" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4
            className="text-[15px] font-semibold tracking-tight truncate"
            style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
          >
            {skill.name}
          </h4>
          <p className="text-[12px]" style={{ color: isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0' }}>
            {skill.level}
            {skill.category ? ` • ${skill.category.replace(/-/g, ' ')}` : ''}
          </p>
        </div>
        <span className="text-sm font-bold bg-linear-to-r from-[#a78bfa] to-[#7c3aed] bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>

      <div
        className="relative z-10 w-full rounded-full h-1.5 overflow-hidden"
        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.12)' }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #a78bfa, #7c3aed)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: [-100, 300] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
