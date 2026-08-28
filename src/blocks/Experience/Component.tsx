'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import type { ExperienceBlock as ExperienceBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'

type Props = {
  disableInnerContainer?: boolean
} & ExperienceBlockType

const easePro = [0.19, 1, 0.22, 1] as const

const ExperienceBlockComponent: React.FC<Props> = ({
  title,
  subtitle,
  description,
  codeLabel,
  experiences,
  layout = 'vertical',
  animationStyle = 'fadeIn',
  showParticles,
  backgroundImage,
  disableInnerContainer: _disableInnerContainer,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sectionY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

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

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.97 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: easePro } },
  }

  const getCardVariants = (): Variants => {
    switch (animationStyle) {
      case 'reveal':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easePro } },
        }
      case 'slideUp':
        return {
          hidden: { y: 60, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: easePro } },
        }
      default:
        return cardVariants
    }
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

        <motion.div
          className={layout === 'horizontal' ? 'max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : layout === 'compact' ? 'max-w-2xl mx-auto space-y-2' : 'max-w-3xl mx-auto space-y-4'}
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {sorted.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              isDark={isDark}
              getTypeIcon={getTypeIcon}
              getTypeColor={getTypeColor}
              getTechColor={getTechColor}
              formatDate={formatDate}
              cardVariants={getCardVariants()}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const ExperienceCard: React.FC<{
  exp: any
  index: number
  isDark: boolean
  getTypeIcon: (type: string) => React.ReactNode
  getTypeColor: (type: string) => string
  getTechColor: (color: string) => string
  formatDate: (date: string) => string
  cardVariants: Variants
}> = ({ exp, index, isDark, getTypeIcon, getTypeColor, getTechColor, formatDate, cardVariants }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const typeColor = getTypeColor(exp.type || 'work')

  return (
    <motion.div
      key={index}
      variants={cardVariants}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl will-change-transform"
        style={{
          backgroundColor: isDark ? 'rgba(23,20,42,0.6)' : 'rgba(255,255,255,0.7)',
          borderColor: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isDark
            ? '0 1px 2px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.03)'
            : '0 1px 2px 0 rgb(0 0 0 / 0.03), inset 0 1px 0 0 rgb(255 255 255 / 0.8)',
          transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.boxShadow = isDark
            ? '0 20px 40px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 0 rgba(255,255,255,0.05)'
            : '0 20px 40px -12px rgb(0 0 0 / 0.08), 0 0 0 1px rgba(124,58,237,0.15), inset 0 1px 0 0 rgba(255,255,255,0.9)'
          el.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.boxShadow = isDark
            ? '0 1px 2px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.03)'
            : '0 1px 2px 0 rgb(0 0 0 / 0.03), inset 0 1px 0 0 rgb(255 255 255 / 0.8)'
          el.style.transform = 'translateY(0)'
        }}
      >
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

        <div className="relative z-10 p-5">
          <div className="flex items-start gap-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                backgroundColor: isDark ? `${typeColor}1a` : `${typeColor}0d`,
                color: typeColor,
              }}
            >
              {getTypeIcon(exp.type || 'work')}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: isDark ? `${typeColor}1a` : `${typeColor}0d`,
                    color: typeColor,
                  }}
                >
                  {exp.type?.charAt(0).toUpperCase() + exp.type?.slice(1) || 'Work'}
                </span>
                <span className="text-[11px]" style={{ color: isDark ? 'rgba(232,224,255,0.45)' : '#8a7bb0' }}>
                  {formatDate(exp.startDate)} — {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  {exp.location && ` · ${exp.location}`}
                </span>
              </div>

              <h3 className="text-[15px] font-semibold leading-snug" style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}>
                {exp.title}
              </h3>

              <p className="text-[13px] font-medium mt-0.5 mb-2" style={{ color: typeColor }}>
                {exp.organization}
              </p>

              {exp.description && (
                <p className="text-[13px] leading-relaxed mb-2" style={{ color: isDark ? 'rgba(232,224,255,0.55)' : '#8a7bb0' }}>
                  {exp.description}
                </p>
              )}

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-1 mb-2">
                  {exp.highlights.map((h: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: isDark ? 'rgba(232,224,255,0.55)' : '#8a7bb0' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: isDark ? 'rgba(139,92,246,0.5)' : '#a78bfa' }} />
                      {h.text}
                    </li>
                  ))}
                </ul>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech: any, i: number) => (
                    <span key={i} className={`text-[10px] px-2 py-0.5 rounded-md ${getTechColor(tech.color || 'blue')}`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export { ExperienceBlockComponent as ExperienceBlock }
