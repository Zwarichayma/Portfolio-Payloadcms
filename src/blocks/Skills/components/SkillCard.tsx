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

type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert'

const LEVEL_META: Record<Level, { color: string; value: number; label: string }> = {
  beginner: { color: '#f87171', value: 25, label: 'Beginner' },
  intermediate: { color: '#fbbf24', value: 50, label: 'Intermediate' },
  advanced: { color: '#34d399', value: 75, label: 'Advanced' },
  expert: { color: '#60a5fa', value: 100, label: 'Expert' },
}

const DEFAULT_ACCENT = '#a78bfa'

const getLevelMeta = (level?: string | null) =>
  level && level in LEVEL_META ? LEVEL_META[level as Level] : null

const formatCategory = (category?: string | null) =>
  category ? category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : null

/** Small pill showing the skill category */
const CategoryBadge: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <span
    className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
    style={{ backgroundColor: accent }}
  >
    {label}
  </span>
)

/** Level indicator: colored dot + label + a thin progress bar for quick scanning */
const LevelIndicator: React.FC<{ level: string; isDark: boolean }> = ({ level, isDark }) => {
  const meta = getLevelMeta(level)
  if (!meta) return null

  return (
    <div
      className="flex flex-col items-end gap-1"
      role="meter"
      aria-label={`Skill level: ${meta.label}`}
      aria-valuenow={meta.value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className="inline-flex items-center gap-1.5 text-[11px] font-medium capitalize"
        style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
        {level}
      </span>
      <span
        className="h-1 w-14  rounded-full"
        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}
      >
        <span
          className="block h-full rounded-full transition-[width] duration-500"
          style={{ width: `${meta.value}%`, backgroundColor: meta.color }}
        />
      </span>
    </div>
  )
}

/** Icon tile shared by both layout variants */
const SkillIcon: React.FC<{ skill: Skill; isDark: boolean; size: 'sm' | 'lg' }> = ({
  skill,
  isDark,
  size,
}) => {
  if (!skill.icon) return null
  const outer = size === 'lg' ? 'h-16 w-16' : 'h-14 w-14'
  const inner = size === 'lg' ? 'h-11 w-11' : 'h-10 w-10'

  return (
    <div
      className={`flex ${outer} flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl`}
      style={{
        backgroundColor: isDark ? 'rgba(12,10,20,0.4)' : 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(139,92,246,0.25)',
      }}
    >
      <Media
        resource={skill.icon}
        alt={typeof skill.name === 'string' ? skill.name : 'Skill icon'}
        className={`${inner} object-contain`}
      />
    </div>
  )
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  gradientColor = DEFAULT_ACCENT,
  variant = 'default',
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isLandscape = variant === 'landscape'

  const categoryLabel = formatCategory(skill.category)
  const description = 'description' in skill ? (skill as { description?: string }).description : undefined

  return (
    <motion.div
      className={`group relative isolate rounded-3xl outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isLandscape ? 'flex w-[340px] sm:w-[360px] min-h-[140px] shrink-0' : 'flex flex-col h-full'
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
          'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.5s ease',
        // @ts-expect-error -- CSS custom property used for the focus ring color
        '--tw-ring-color': gradientColor,
      }}
      tabIndex={0}
      role="group"
      aria-label={typeof skill.name === 'string' ? skill.name : 'Skill'}
      whileHover={{
        y: -4,
        borderColor: `${gradientColor}66`,
        boxShadow: isDark
          ? `0 20px 40px -12px rgb(0 0 0 / 0.5), 0 0 0 1px ${gradientColor}40`
          : `0 20px 40px -12px rgb(0 0 0 / 0.08), 0 0 0 1px ${gradientColor}33`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Liquid Ether animation, clipped in its own layer so it never fights with the
          outer element's border-radius during the hover transform (a known Chrome/WebKit
          glitch when overflow-hidden + box-shadow + transform sit on the same element) */}
      <div className="pointer-events-none absolute inset-0 -z-10  rounded-3xl">
        <LiquidEtherBackground />
      </div>

      {isLandscape ? (
        <div className="relative z-10 flex h-full w-full flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-3">
            {categoryLabel ? (
              <CategoryBadge label={categoryLabel} accent={`${gradientColor}b3`} />
            ) : (
              <span />
            )}
            {skill.level && <LevelIndicator level={skill.level} isDark={isDark} />}
          </div>

          <div className="flex items-center gap-4">
            <SkillIcon skill={skill} isDark={isDark} size="sm" />
            <div className="min-w-0">
              <h3
                className="truncate text-xl font-bold tracking-tight"
                style={{
                  color: isDark ? '#f4f0ff' : '#1d1733',
                  textShadow: isDark ? '0 1px 8px rgba(0,0,0,0.5)' : '0 1px 8px rgba(255,255,255,0.6)',
                }}
                title={typeof skill.name === 'string' ? skill.name : undefined}
              >
                {skill.name}
              </h3>
              {description && (
                <p
                  className="mt-1 line-clamp-2 text-xs"
                  style={{ color: isDark ? 'rgba(232,224,255,0.7)' : 'rgba(42,33,64,0.7)' }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-2">
            {categoryLabel ? (
              <CategoryBadge label={categoryLabel} accent={`${gradientColor}b3`} />
            ) : (
              <span />
            )}
            {skill.level && <LevelIndicator level={skill.level} isDark={isDark} />}
          </div>

          {skill.icon && (
            <div className="flex items-center justify-center">
              <SkillIcon skill={skill} isDark={isDark} size="lg" />
            </div>
          )}

          <h3
            className={`truncate text-center text-[15px] font-semibold tracking-tight ${
              skill.icon ? '' : 'flex flex-1 items-center justify-center'
            }`}
            style={{
              color: isDark ? '#f4f0ff' : '#1d1733',
              textShadow: isDark ? '0 1px 8px rgba(0,0,0,0.5)' : '0 1px 8px rgba(255,255,255,0.6)',
            }}
            title={typeof skill.name === 'string' ? skill.name : undefined}
          >
            {skill.name}
          </h3>
        </div>
      )}
    </motion.div>
  )
}