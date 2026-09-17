'use client'

import React, { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion'
import type { ProjectsBlock as ProjectsBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'
import { LiquidEtherBackground } from '@/components/custom/LiquidEtherBackground'

type Skill = NonNullable<ProjectsBlockType['projects']>[0]

interface ProjectCardProps {
  project: Skill
  getTechColor: (color: string) => string
  isDark: boolean
}

const easePro = [0.19, 1, 0.22, 1] as const

const ProjectCard: React.FC<ProjectCardProps> = ({ project, getTechColor, isDark }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative isolate overflow-hidden rounded-2xl will-change-transform flex flex-col"
      style={{
        backgroundColor: isDark ? 'rgba(23,20,42,0.6)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 1px 2px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.03)'
          : '0 1px 2px 0 rgb(0 0 0 / 0.03), inset 0 1px 0 0 rgb(255 255 255 / 0.8)',
        transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
      }}
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -4,
        boxShadow: isDark
          ? '0 20px 40px -12px rgb(0 0 0 / 0.5), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 0 rgba(255,255,255,0.05)'
          : '0 20px 40px -12px rgb(0 0 0 / 0.08), 0 0 0 1px rgba(124,58,237,0.15), inset 0 1px 0 0 rgba(255,255,255,0.9)',
      }}
    >
      <LiquidEtherBackground />

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

      {project.thumbnail && (
        <div className="relative h-44 overflow-hidden flex-shrink-0 rounded-t-2xl">
          <Media resource={project.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
          {project.featured && (
            <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-400/90 text-amber-950 backdrop-blur-sm">
              Featured
            </span>
          )}
          <span
            className="absolute bottom-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full text-white backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(124,58,237,0.6)' }}
          >
            {project.category?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Project'}
          </span>
        </div>
      )}

      <div className="relative z-10 p-5 flex flex-col gap-3 flex-1">
        {!project.thumbnail && (
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: 'rgba(124,58,237,0.6)' }}
            >
              {project.category?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Project'}
            </span>
            {project.featured && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-400/90 text-amber-950">
                Featured
              </span>
            )}
          </div>
        )}

        <h3
          className="text-[15px] font-semibold tracking-tight leading-snug"
          style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
        >
          {project.title}
        </h3>

        <p
          className="text-[13px] leading-relaxed line-clamp-2 flex-1"
          style={{ color: isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0' }}
        >
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className={`text-[10px] px-2 py-0.5 rounded-md ${getTechColor(tech.color || 'blue')}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {(project.links?.liveUrl || project.links?.githubUrl) && (
          <div className="flex items-center gap-4 pt-1">
            {project.links?.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium inline-flex items-center gap-1.5 transition-all duration-300 hover:gap-2"
                style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.links?.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium inline-flex items-center gap-1.5 transition-all duration-300 hover:gap-2"
                style={{ color: isDark ? 'rgba(232,224,255,0.55)' : '#4b3f73' }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Source
              </a>
            )}
          </div>
        )}
      </div>
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

  const [activeFilter, setActiveFilter] = useState('all')

  const categories = useMemo(() => {
    if (!projects) return ['all']
    const cats = new Set(projects.map((p) => p.category || 'other'))
    return ['all', ...Array.from(cats)]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    if (activeFilter === 'all') return projects
    return projects.filter((p) => p.category === activeFilter)
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
                {category === 'all' ? 'All' : category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
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
