'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import type { SkillsBlock } from '@/payload-types'

type Skill = NonNullable<SkillsBlock['skills']>[0]

interface CircularProgressProps {
  skill: Skill
  gradientColor: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ skill, gradientColor }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [progress, setProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(skill.percentage || 0)
    }, 500)

    return () => clearTimeout(timer)
  }, [skill.percentage])

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
      className="group relative overflow-hidden rounded-2xl will-change-transform flex flex-col items-center p-6 h-full"
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
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

      {/* Icon */}
      {skill.icon && (
        <div
          className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center mb-4"
          style={{
            backgroundColor: isDark ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          <Media resource={skill.icon} className="w-9 h-9 object-contain" />
        </div>
      )}

      {/* Circular Progress */}
      <div className="relative w-28 h-28 mb-3">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.12)'}
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#skill-gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            className="drop-shadow-lg"
          />
          <defs>
            <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold bg-linear-to-r from-[#a78bfa] to-[#7c3aed] bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>

      {/* Skill info */}
      <div className="text-center">
        <motion.h4
          className="text-[15px] font-semibold tracking-tight"
          style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {skill.name}
        </motion.h4>
        <p className="text-[12px]" style={{ color: isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0' }}>
          {skill.level}
          {skill.category ? ` • ${skill.category.replace(/-/g, ' ')}` : ''}
        </p>
      </div>
    </motion.div>
  )
}
