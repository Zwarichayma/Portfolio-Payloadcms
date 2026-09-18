'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/Theme'
import type { SkillsBlock } from '@/payload-types'

type Skill = NonNullable<SkillsBlock['skills']>[0]

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Languages',
  backend: 'Frameworks',
  database: 'Databases',
  devops: 'DevOps / Tools',
  design: 'Design',
  mobile: 'Mobile',
  other: 'Other',
}

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#a78bfa',
  backend: '#7c3aed',
  database: '#c4b5fd',
  devops: '#8b5cf6',
  design: '#d8b4fe',
  mobile: '#818cf8',
  other: '#a78bfa',
}

const getCategoryLabel = (category: string) => CATEGORY_LABELS[category] || category
const getCategoryColor = (category: string) => CATEGORY_COLORS[category] || '#8b5cf6'

export const SkillCategoryCard: React.FC<{
  category: string
  skills: Skill[]
  index: number
}> = ({ category, skills, index }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const color = getCategoryColor(category)
  const label = getCategoryLabel(category)

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl p-5"
      style={{
        background: isDark ? 'rgba(23,20,42,0.6)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)'}`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: index * 0.08 }}
      whileHover={{ y: -3, boxShadow: `0 8px 32px ${color}22` }}
    >
      {/* Corner brackets */}
      <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2" style={{ borderColor: color }} />
      <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2" style={{ borderColor: color }} />

      {/* Category header */}
      <div className="mb-5 flex items-center gap-2.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </span>
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {skills.map((skill, i) => {
          const pct = Math.min(100, Math.max(0, skill.percentage || 0))
          return (
            <div key={i}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span
                  className="truncate text-[13px]"
                  style={{ color: isDark ? 'rgba(226,232,240,0.85)' : '#2a2140' }}
                >
                  {skill.name}
                </span>
                <span
                  className="shrink-0 text-xs font-semibold"
                  style={{ color, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {pct}%
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(124,58,237,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color, boxShadow: `0 0 10px ${color}80` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.08 + i * 0.06 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
