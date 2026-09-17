'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Building2, Calendar, CheckCircle2, ChevronDown, MapPin } from 'lucide-react'
import type { ExperienceBlock as ExperienceBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'

type Props = {
  disableInnerContainer?: boolean
} & ExperienceBlockType

type Experience = NonNullable<ExperienceBlockType['experiences']>[0]

const easePro = [0.19, 1, 0.22, 1] as const

const ExperienceBlockComponent: React.FC<Props> = ({
  title,
  subtitle,
  description,
  codeLabel,
  experiences,
  showParticles,
  backgroundImage,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sectionY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const sorted = [...(experiences || [])].sort((a, b) => {
    const aDate = a.startDate ? new Date(a.startDate).getTime() : 0
    const bDate = b.startDate ? new Date(b.startDate).getTime() : 0
    return bDate - aDate
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'internship':
      case 'education':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        )
      case 'freelance':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'volunteer':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'certification':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return '#7c3aed'
      case 'internship':
      case 'education': return '#a78bfa'
      case 'freelance': return '#34d399'
      case 'volunteer': return '#fbbf24'
      case 'certification': return '#f9a8d4'
      default: return '#a78bfa'
    }
  }

  const getTechColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      purple: 'bg-purple-100/80 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      green: 'bg-green-100/80 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      orange: 'bg-orange-100/80 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
      red: 'bg-red-100/80 text-red-700 dark:bg-red-900/20 dark:text-red-300',
      pink: 'bg-pink-100/80 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
      teal: 'bg-teal-100/80 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
      indigo: 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    }
    return colors[color] || colors.purple
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const headerVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easePro } },
  }

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden will-change-transform"
      style={{ backgroundColor: isDark ? '#0c0a14' : '#fbfaff' }}
    >
      {showParticles && <Particles count={20} />}

      {backgroundImage && (
        <motion.div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]" style={{ y: sectionY }}>
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {codeLabel && (
            <motion.span
              className="inline-block mb-3 text-xs px-3 py-1 rounded"
              style={{
                background: 'rgba(124,58,237,0.12)',
                color: '#a78bfa',
                border: '1px solid rgba(124,58,237,0.2)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
              variants={headerVariants}
            >
              {codeLabel}
            </motion.span>
          )}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            variants={headerVariants}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p className="text-base font-medium" style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }} variants={headerVariants}>
              {subtitle}
            </motion.p>
          )}
          {description && (
            <motion.p className="text-sm max-w-2xl mx-auto mt-3" style={{ color: isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0' }} variants={headerVariants}>
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Timeline + collapsible cards */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 ml-5 hidden w-px md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.5), rgba(124,58,237,0.05))' }}
          />

          <div className="space-y-4">
            {sorted.map((exp, index) => (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
                isDark={isDark}
                isOpen={openIdx === index}
                onToggle={() => setOpenIdx(openIdx === index ? null : index)}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
                getTechColor={getTechColor}
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ExperienceCard: React.FC<{
  exp: Experience
  index: number
  isDark: boolean
  isOpen: boolean
  onToggle: () => void
  getTypeIcon: (type: string) => React.ReactNode
  getTypeColor: (type: string) => string
  getTechColor: (color: string) => string
  formatDate: (date: string) => string
}> = ({ exp, index, isDark, isOpen, onToggle, getTypeIcon, getTypeColor, getTechColor, formatDate }) => {
  const typeColor = getTypeColor(exp.type || 'work')
  const muted = isDark ? 'rgba(232,224,255,0.45)' : '#8a7bb0'
  const textColor = isDark ? '#e8e0ff' : '#2a2140'

  const period = `${formatDate(exp.startDate)} — ${
    exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'Present'
  }`

  return (
    <motion.div
      className="relative md:pl-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: easePro, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-3 top-5 hidden h-5 w-5 items-center justify-center rounded-full md:flex"
        style={{
          background: isDark ? '#0c0a14' : '#fbfaff',
          border: `2px solid ${typeColor}`,
        }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: typeColor }} />
      </div>

      <div
        className="cursor-pointer overflow-hidden rounded-xl"
        style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
          border: isOpen ? '1px solid rgba(124,58,237,0.35)' : '1px solid rgba(139,92,246,0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onClick={onToggle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${typeColor}1f`, border: `1px solid ${typeColor}33`, color: typeColor }}
          >
            {getTypeIcon(exp.type || 'work')}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-base font-semibold" style={{ color: textColor }}>
                {exp.title}
              </span>
              <span
                className="rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                style={{ background: `${typeColor}1f`, color: typeColor }}
              >
                {exp.type || 'work'}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: muted }}>
              {exp.organization && (
                <span className="flex items-center gap-1">
                  <Building2 size={11} />
                  {exp.organization}
                </span>
              )}
              {exp.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {exp.location}
                </span>
              )}
              <span
                className="flex items-center gap-1"
                style={{ color: '#a78bfa', fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Calendar size={11} />
                {period}
              </span>
            </div>
          </div>

          <ChevronDown
            size={16}
            color="#a78bfa"
            className="mt-1 shrink-0 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
          />
        </div>

        {/* Body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easePro }}
            >
              <div className="px-5 pb-5">
                <div className="mb-4 h-px" style={{ background: 'rgba(139,92,246,0.12)' }} />

                {exp.description && (
                  <p className="mb-3 text-sm leading-relaxed" style={{ color: isDark ? 'rgba(232,224,255,0.6)' : '#8a7bb0' }}>
                    {exp.description}
                  </p>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: isDark ? 'rgba(232,224,255,0.6)' : '#8a7bb0' }}
                      >
                        <CheckCircle2 size={14} color="#7c3aed" className="mt-0.5 shrink-0" />
                        {h.text}
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className={`text-[10px] px-2 py-0.5 rounded-md ${getTechColor(tech.color || 'blue')}`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export { ExperienceBlockComponent as ExperienceBlock }
