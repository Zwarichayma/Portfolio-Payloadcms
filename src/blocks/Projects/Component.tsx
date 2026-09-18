'use client'

import React, { useMemo, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion'
import type { ProjectsBlock as ProjectsBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'
import { Starfield } from '@/components/custom/Starfield'
import { LiquidEtherBackground } from '@/components/custom/LiquidEtherBackground'

type Skill = NonNullable<ProjectsBlockType['projects']>[0]

const CATEGORY_LABELS: Record<string, string> = {
  website: 'Web Site',
  webapp: 'Web App',
  plugin: 'Plugin',
  production: 'Production',
  mobile: 'Mobile App',
  api: 'API',
  cli: 'CLI Tool',
  library: 'Library',
  'design-system': 'Design System',
  'open-source': 'Open Source',
  other: 'Other',
}

const formatCategory = (category?: string | null): string =>
  category
    ? CATEGORY_LABELS[category] ||
      category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : ''

const getDisplayUrl = (url?: string | null): string => {
  if (!url) return ''
  try {
    const { hostname, pathname } = new URL(url)
    const host = hostname.replace(/^www\./, '')
    const path = pathname === '/' ? '' : pathname
    return `${host}${path}`
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '')
  }
}

interface ProjectCardProps {
  project: Skill
  getTechColor: (color: string) => string
  isDark: boolean
}

const easePro = [0.19, 1, 0.22, 1] as const

const ProjectCard: React.FC<ProjectCardProps> = ({ project, getTechColor, isDark }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const primaryUrl = project.links?.liveUrl || project.links?.githubUrl
  const displayUrl = getDisplayUrl(project.links?.liveUrl)

  return (
    <motion.div
      ref={cardRef}
      className="group relative isolate overflow-hidden rounded-2xl will-change-transform flex flex-col p-6"
      style={{
        backgroundColor: isDark ? '#12101c' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(139,92,246,0.18)' : 'rgba(139,92,246,0.15)'}`,
        boxShadow: isDark
          ? '0 1px 2px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.03)'
          : '0 1px 2px 0 rgb(0 0 0 / 0.03), inset 0 1px 0 0 rgb(255 255 255 / 0.8)',
        transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
      }}
      whileHover={{
        y: -4,
        boxShadow: isDark
          ? '0 20px 40px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgba(124,58,237,0.25), inset 0 1px 0 0 rgba(255,255,255,0.05)'
          : '0 20px 40px -12px rgb(0 0 0 / 0.08), 0 0 0 1px rgba(124,58,237,0.15), inset 0 1px 0 0 rgba(255,255,255,0.9)',
      }}
    >
      <LiquidEtherBackground />

      {/* Header row: icon + title/url on the left, category badge + external link on the right */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          {project.thumbnail ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border"
              style={{ borderColor: isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.2)' }}>
              <Media resource={project.thumbnail} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.1)',
                border: `1px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.25)'}`,
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke={isDark ? '#a78bfa' : '#7c3aed'}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18"
                />
              </svg>
            </div>
          )}

          <div className="min-w-0">
            <h3
              className="text-[15px] font-semibold tracking-tight leading-snug truncate"
              style={{ color: isDark ? '#f1ecff' : '#241b3a' }}
            >
              {project.title}
            </h3>
            {displayUrl && (
              <a
                href={project.links?.liveUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] truncate block hover:underline"
                style={{
                  color: isDark ? '#a78bfa' : '#7c3aed',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {displayUrl}
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-lg whitespace-nowrap"
            style={{
              color: isDark ? '#a78bfa' : '#7c3aed',
              backgroundColor: isDark ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.08)',
              border: `1px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.25)'}`,
            }}
          >
            {formatCategory(project.category) || 'Project'}
          </span>

          {primaryUrl && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors duration-200"
              style={{
                color: isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0',
              }}
              aria-label="Open project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H8M17 7v9"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p
          className="relative z-10 text-[13px] leading-relaxed mb-5"
          style={{ color: isDark ? 'rgba(232,224,255,0.55)' : '#8a7bb0' }}
        >
          {project.description}
        </p>
      )}

      {/* Divider */}
      <div
        className="relative z-10 mb-4"
        style={{
          borderTop: `1px solid ${isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.12)'}`,
        }}
      />

      {/* Tech tags */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`text-[11px] px-2.5 py-1 rounded-md border border-current/20 ${getTechColor(tech.color || 'blue')}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

type Props = {
  disableInnerContainer?: boolean
} & ProjectsBlockType

const ProjectsBlockComponent: React.FC<Props> = ({
  title,
  subtitle,
  description,
  codeLabel,
  projects,
  displayStyle,
  showFilters,
  itemsPerRow,
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

  const [activeFilter, setActiveFilter] = React.useState('all')

  const getCategoryKey = (category?: string | null) => category || 'other'

  const categories = useMemo(() => {
    if (!projects) return ['all']
    const cats = new Set(projects.map((p) => getCategoryKey(p.category)))
    return ['all', ...Array.from(cats)]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    if (activeFilter === 'all') return projects
    return projects.filter((p) => getCategoryKey(p.category) === activeFilter)
  }, [projects, activeFilter])

  const getGridCols = () => {
    switch (itemsPerRow) {
      case '1': return 'grid-cols-1 md:grid-cols-1'
      case '2': return 'grid-cols-1 md:grid-cols-2'
      case '3': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case '4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
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
      yellow: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    }
    return colors[color] || colors.purple
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
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easePro } },
        }
      case 'slideUp':
        return {
          hidden: { y: 60, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: easePro } },
        }
      case 'stagger':
        return cardVariants
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
      <Starfield />

      {showParticles && <Particles count={20} />}

      {backgroundImage && (
        <motion.div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]" style={{ y: sectionY }}>
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
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

        {showFilters && categories.length > 1 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easePro }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeFilter === category
                    ? isDark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.1)'
                    : isDark ? 'rgba(23,20,42,0.5)' : 'rgba(250,247,255,0.8)',
                  color: activeFilter === category
                    ? isDark ? '#a78bfa' : '#7c3aed'
                    : isDark ? '#c4b5fd' : '#8a7bb0',
                  borderColor: activeFilter === category
                    ? isDark ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.2)'
                    : 'transparent',
                  borderWidth: 1,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {category === 'all' ? 'All' : formatCategory(category)}
              </motion.button>
            ))}
          </motion.div>
        )}

        {displayStyle === 'carousel' ? (
          <div className="overflow-hidden -mx-8 md:-mx-12 lg:-mx-16">
            <motion.div
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-8 md:px-12 lg:px-16"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title || index}
                    variants={getCardVariants()}
                    layout
                    className="min-w-[340px] md:min-w-[380px] snap-start flex-shrink-0"
                  >
                    <ProjectCard
                      project={project}
                      getTechColor={getTechColor}
                      isDark={isDark}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : displayStyle === 'list' ? (
          <motion.div
            className="max-w-3xl mx-auto space-y-5"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title || index}
                  variants={getCardVariants()}
                  layout
                >
                  <ProjectCard
                    project={project}
                    getTechColor={getTechColor}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className={`container grid ${getGridCols()} gap-5 justify-items-center`}
            variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title || index}
                  variants={getCardVariants()}
                  layout
                  className="w-full"
                >
                  <ProjectCard
                    project={project}
                    getTechColor={getTechColor}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export { ProjectsBlockComponent as ProjectsBlock }
