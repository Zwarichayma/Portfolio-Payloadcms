'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Cpu, Wrench, Palette, Smartphone, Layers } from 'lucide-react'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import type { SkillsBlock } from '@/payload-types'

type Skill = NonNullable<SkillsBlock['skills']>[0]

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

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  frontend: Code2,
  backend: Cpu,
  database: Database,
  devops: Wrench,
  design: Palette,
  mobile: Smartphone,
  other: Layers,
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  devops: 'DevOps',
  design: 'Design',
  mobile: 'Mobile',
  other: 'Other',
}

const SkillPie: React.FC<{ level: number; size?: number }> = ({ level, size = 34 }) => {
  const stroke = 3
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, level)) / 100) * circumference

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(124,58,237,0.15)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#a855f7"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold"
        style={{ color: '#a78bfa', fontFamily: "'JetBrains Mono', monospace" }}
      >
        {level}%
      </span>
    </div>
  )
}

export const SkillCategoryCard: React.FC<{
  category: string
  skills: Skill[]
  index: number
}> = ({ category, skills, index }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const Icon = CATEGORY_ICONS[category] || Layers
  const label = CATEGORY_LABELS[category] || category

  return (
    <motion.div
      className="rounded-xl p-4"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(139,92,246,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
      whileHover={{
        y: -3,
        borderColor: 'rgba(139,92,246,0.35)',
        boxShadow: '0 8px 32px rgba(139,92,246,0.12)',
      }}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <Icon size={14} color="#a78bfa" />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }}
        >
          {label}
        </span>
      </div>

      <div className="space-y-2.5">
        {skills.map((skill, i) => {
          const color = levelColor(skill.level)
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.06 }}
            >
              {skill.icon && (
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(139,92,246,0.2)',
                  }}
                >
                  <Media resource={skill.icon} className="h-5 w-5 object-contain" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div
                  className="truncate text-[13px] font-medium"
                  style={{ color: isDark ? 'rgba(232,224,255,0.85)' : '#2a2140' }}
                >
                  {skill.name}
                </div>
                {skill.level && (
                  <span
                    className="mt-0.5 inline-block rounded-full px-1.5 py-[1px] text-[9px] font-medium capitalize"
                    style={{ background: `${color}1f`, color }}
                  >
                    {skill.level}
                  </span>
                )}
              </div>

              <SkillPie level={skill.percentage || 0} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
