'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { LiquidEtherBackground } from '@/components/custom/LiquidEtherBackground'
import type { SkillsBlock } from '@/payload-types'

type Skill = NonNullable<SkillsBlock['skills']>[0]

interface SkillCardProps {
  skill: Skill
  gradientColor?: string
  variant?: 'default' | 'landscape'
}

const levelColor = (level?: string | null) => {
  switch (level) {
    case 'beginner':
      return '#f87171'
    case 'intermediate':
      return '#fbbf24'
    case 'advanced':
      return '#34d399'
    case 'expert':
      return '#60a5fa'
    default:
      return '#a78bfa'
  }
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, variant = 'default' }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isLandscape = variant === 'landscape'

  const categoryLabel = skill.category
    ? skill.category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    : null
  const dot = levelColor(skill.level)

  return (
    <motion.div
      className={`group relative isolate overflow-hidden rounded-3xl will-change-transform ${
        isLandscape ? 'flex w-[340px] sm:w-[360px] h-[200px] shrink-0' : 'flex flex-col h-full'
      }`}
      style={{
        backgroundColor: isDark ? 'rgba(23,20,42,0.5)' : 'rgba(255,255,255,0.55)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isDark ? 'rgba(139,92,246,0.18)' : 'rgba(139,92,246,0.22)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: isDark
          ? '0 1px 2px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.04)'
          : '0 1px 2px 0 rgb(0 0 0 / 0.03), inset 0 1px 0 0 rgb(255 255 255 / 0.8)',
        transition:
          'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
      }}
      whileHover={{
        y: -4,
        boxShadow: isDark
          ? '0 20px 40px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgba(124,58,237,0.25)'
          : '0 20px 40px -12px rgb(0 0 0 / 0.08), 0 0 0 1px rgba(124,58,237,0.2)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Liquid Ether animation (clipped inside the card) */}
      <LiquidEtherBackground />

      {isLandscape ? (
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-6">
          <div className="flex items-center justify-between gap-3">
            {categoryLabel && (
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: 'rgba(124,58,237,0.7)' }}
              >
                {categoryLabel}
              </span>
            )}
            {skill.level && (
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium capitalize"
                style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
                {skill.level}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {skill.icon && (
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: isDark ? 'rgba(12,10,20,0.4)' : 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(139,92,246,0.25)',
                }}
              >
                <Media resource={skill.icon} className="h-10 w-10 object-contain" />
              </div>
            )}
            <h3
              className="truncate text-xl font-bold tracking-tight"
              style={{ color: isDark ? '#f4f0ff' : '#1d1733', textShadow: isDark ? '0 1px 8px rgba(0,0,0,0.5)' : '0 1px 8px rgba(255,255,255,0.6)' }}
            >
              {skill.name}
            </h3>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-2">
            {categoryLabel ? (
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: 'rgba(124,58,237,0.7)' }}
              >
                {categoryLabel}
              </span>
            ) : (
              <span />
            )}
            {skill.level && (
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium capitalize"
                style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
                {skill.level}
              </span>
            )}
          </div>

          <div className="flex flex-1 items-center justify-center">
            {skill.icon ? (
              <div
                className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: isDark ? 'rgba(12,10,20,0.4)' : 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(139,92,246,0.25)',
                }}
              >
                <Media resource={skill.icon} className="h-11 w-11 object-contain" />
              </div>
            ) : null}
          </div>

          <h3
            className="truncate text-center text-[15px] font-semibold tracking-tight"
            style={{ color: isDark ? '#f4f0ff' : '#1d1733', textShadow: isDark ? '0 1px 8px rgba(0,0,0,0.5)' : '0 1px 8px rgba(255,255,255,0.6)' }}
          >
            {skill.name}
          </h3>
        </div>
      )}
    </motion.div>
  )
}
