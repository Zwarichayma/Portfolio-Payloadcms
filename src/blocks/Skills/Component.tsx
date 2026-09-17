'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { SkillsBlock as SkillsBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { SkillCard } from './components/SkillCard'
import { SkillCategoryCard } from './components/SkillCategoryCard'
import { ProgressBar } from './components/ProgressBar'
import { CircularProgress } from './components/CircularProgress'
import { ParticleBackground } from './components/ParticleBackground'

type Props = {
  disableInnerContainer?: boolean
} & SkillsBlockType

const SkillsBlockComponent: React.FC<Props> = ({
  title,
  codeLabel,
  subtitle,
  description,
  skills,
  displayStyle,
  animationStyle,
  showParticles,
  backgroundImage,
  disableInnerContainer,
}) => {
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationStyle === 'stagger' ? 0.1 : 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const scaleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'backOut' as const },
    },
  }

  const getAnimationVariants = () => {
    switch (animationStyle) {
      case 'slideUp':
        return itemVariants
      case 'scale':
        return scaleVariants
      case 'stagger':
        return itemVariants
      default:
        return itemVariants
    }
  }

  const getGridColumns = () => {
    switch (displayStyle) {
      case 'progress':
        return 'grid-cols-1 md:grid-cols-2'
      case 'circular':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      case 'chart':
        return 'grid-cols-1'
      default: // grid
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'from-blue-500 to-cyan-500',
      backend: 'from-green-500 to-emerald-500',
      database: 'from-purple-500 to-violet-500',
      devops: 'from-orange-500 to-red-500',
      design: 'from-pink-500 to-rose-500',
      mobile: 'from-indigo-500 to-blue-500',
      other: 'from-gray-500 to-slate-500',
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  return (
    <div
      className="relative py-16 md:py-24 overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#0c0a14' : '#fbfaff',
      }}
    >
      {showParticles && <ParticleBackground />}

      {backgroundImage && (
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
        </div>
      )}

      <motion.div
        className={`relative z-10 ${
          disableInnerContainer ? '' : 'container mx-auto px-6'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          {codeLabel && (
            <motion.span
              className="inline-block mb-3 text-xs px-3 py-1 rounded"
              style={{
                background: 'rgba(124,58,237,0.12)',
                color: '#a78bfa',
                border: '1px solid rgba(124,58,237,0.2)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
              variants={getAnimationVariants()}
            >
              {codeLabel}
            </motion.span>
          )}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-[#a78bfa] to-[#7c3aed] bg-clip-text text-transparent"
            variants={getAnimationVariants()}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.h3
              className="text-xl md:text-2xl text-[#4b3f73] dark:text-[#c4b5fd] mb-6 transition-colors duration-300"
              variants={getAnimationVariants()}
            >
              {subtitle}
            </motion.h3>
          )}

          {description && (
            <motion.p
              className="text-lg text-[#8a7bb0] dark:text-[rgba(232,224,255,0.5)] max-w-3xl mx-auto transition-colors duration-300"
              variants={getAnimationVariants()}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Skills Display — category cards with skill bars (reference design) */}
        {skills && skills.length > 0 && displayStyle === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from(new Set(skills.map((s) => s.category || 'other'))).map((category, ci) => (
              <SkillCategoryCard
                key={category}
                category={category}
                skills={skills.filter((s) => (s.category || 'other') === category)}
                index={ci}
              />
            ))}
          </div>
        )}

        {/* Progress / Circular Display */}
        {skills && skills.length > 0 && (displayStyle === 'progress' || displayStyle === 'circular') && (
          <motion.div className={`grid ${getGridColumns()} gap-6`} variants={containerVariants}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={getAnimationVariants()}
                whileHover={{ scale: 1.05 }}
                className="transition-transform duration-300"
              >
                {displayStyle === 'progress' && (
                  <ProgressBar skill={skill} gradientColor={getCategoryColor(skill.category || 'other')} />
                )}

                {displayStyle === 'circular' && (
                  <CircularProgress skill={skill} gradientColor={getCategoryColor(skill.category || 'other')} />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Scroll Carousel Display Style */}
        {skills && skills.length > 0 && displayStyle === 'cardSwap' && (
          <motion.div className="relative max-w-5xl mx-auto" variants={getAnimationVariants()}>
            {/*
              FIX: `overflow-x-auto` alone forces `overflow-y` to compute as `auto` too
              (per the CSS Overflow spec, an axis left at `visible` while the other isn't
              gets promoted to `auto`). That silently clips anything that moves or grows
              outside the container vertically — including SkillCard's `whileHover={{ y: -4 }}`
              lift and its wider hover box-shadow — which is what made cards look like they
              were being "hidden" on hover.
              `pt-3`/`pb-6` (instead of just `pb-4`) give that vertical movement room on
              both edges so it never gets clipped by the now-implicit `overflow-y: auto`.
            */}
            <div className="flex gap-6 overflow-x-auto pt-3 pb-6 px-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {skills.map((skill, index) => (
                <div key={index} className="snap-start">
                  <SkillCard skill={skill} variant="landscape" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chart Display Style */}
        {displayStyle === 'chart' && skills && skills.length > 0 && (
          <motion.div
            className="bg-white/70 dark:bg-[#17142a] rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-[#e9e2ff] dark:border-purple-500/20"
            variants={getAnimationVariants()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Skills by Category */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-[#2a2140] dark:text-white">
                  Skills by Category
                </h4>
                <div className="space-y-4">
                  {Array.from(new Set(skills.map((skill) => skill.category))).map((category, index) => {
                    const categorySkills = skills.filter((skill) => skill.category === category)
                    const avgPercentage =
                      categorySkills.reduce((sum, skill) => sum + (skill.percentage || 0), 0) /
                      categorySkills.length

                    return (
                      <div key={index} className="relative">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-[#4b3f73] dark:text-[#c4b5fd] capitalize">
                            {category}
                          </span>
                          <span className="text-sm text-[#8a7bb0] dark:text-[rgba(232,224,255,0.5)]">
                            {Math.round(avgPercentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-[#e9e2ff] dark:bg-[#2a2640] rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full bg-linear-to-r ${getCategoryColor(category || 'other')}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${avgPercentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Skills */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-[#2a2140] dark:text-white">Top Skills</h4>
                <div className="space-y-3">
                  {[...skills]
                    .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
                    .slice(0, 5)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {skill.icon && (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Media resource={skill.icon} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-[#2a2140] dark:text-white">
                              {skill.name}
                            </span>
                            <span className="text-sm text-[#8a7bb0] dark:text-[rgba(232,224,255,0.5)]">
                              {skill.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['{', '}', '<', '>', '/', '*', '+', '='].map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-[#7c3aed]/10 dark:text-[#a78bfa]/10 text-4xl font-mono"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: [null, -30, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.8,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { SkillsBlockComponent as SkillsBlock }