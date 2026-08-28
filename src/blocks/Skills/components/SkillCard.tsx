'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import type { SkillsBlock } from '@/payload-types'

type Skill = NonNullable<SkillsBlock['skills']>[0]

interface SkillCardProps {
  skill: Skill
  gradientColor?: string
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, gradientColor }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const progress = Math.min(100, Math.max(0, skill.percentage || 0))

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl will-change-transform flex flex-col h-full"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(124,58,237,0.03) 0%, transparent 50%)'
            : 'linear-gradient(180deg, rgba(124,58,237,0.02) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 p-5 flex flex-col gap-3 flex-1">
        {/* Header: category chip + percentage */}
        <div className="flex items-center justify-between">
          {skill.category ? (
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: 'rgba(124,58,237,0.6)' }}
            >
              {skill.category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </span>
          ) : (
            <span />
          )}
          <span
            className="text-sm font-bold bg-linear-to-r from-[#a78bfa] to-[#7c3aed] bg-clip-text text-transparent"
          >
            {progress}%
          </span>
        </div>

        {/* Icon + Name */}
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div
              className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: isDark ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <Media resource={skill.icon} className="w-9 h-9 object-contain" />
            </div>
          )}
          <div className="min-w-0">
            <h3
              className="text-[15px] font-semibold tracking-tight leading-snug truncate"
              style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
            >
              {skill.name}
            </h3>
            {skill.level && (
              <p className="text-[12px]" style={{ color: isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0' }}>
                {skill.level}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-auto">
          <div
            className="w-full rounded-full h-1.5 overflow-hidden"
            style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.12)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
