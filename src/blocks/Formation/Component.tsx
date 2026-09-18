'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import type { FormationBlock as FormationBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'
import { Starfield } from '@/components/custom/Starfield'
import { LiquidEtherBackground } from '@/components/custom/LiquidEtherBackground'
import { SectionLabel } from '@/components/custom/SectionLabel'

type Props = {
  disableInnerContainer?: boolean
} & FormationBlockType

const easeFluid = [0.16, 1, 0.3, 1] as const

const FormationBlockComponent: React.FC<Props> = ({
  title,
  codeLabel,
  subtitle,
  description,
  items,
  displayStyle,
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

  const headerVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeFluid } },
  }

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.97 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeFluid } },
  }

  const getCardVariants = (): Variants => {
    switch (animationStyle) {
      case 'slideUp':
        return {
          hidden: { y: 60, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: easeFluid } },
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeFluid } },
        }
      default:
        return cardVariants
    }
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  }

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden will-change-transform"
      style={{ backgroundColor: isDark ? '#0c0a14' : '#fbfaff' }}
    >
      <Starfield />

      {showParticles && <Particles count={15} />}

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
          <SectionLabel code={codeLabel} />
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
          className={displayStyle === 'list' ? 'max-w-3xl mx-auto space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {(items || []).map((item, index) => (
            <motion.div key={index} variants={getCardVariants()}>
              <div
                className="group relative isolate overflow-hidden rounded-2xl p-5 h-full transition-all duration-300"
                style={{
                  backgroundColor: isDark ? 'rgba(23,20,42,0.6)' : 'rgba(255,255,255,0.7)',
                  border: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)'}`,
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-3px)'
                  el.style.boxShadow = '0 20px 40px -12px rgba(124,58,237,0.25)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <LiquidEtherBackground />

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDark ? `${item.accent || '#7c3aed'}22` : `${item.accent || '#7c3aed'}11`,
                      border: `1px solid ${item.accent || '#7c3aed'}33`,
                    }}
                  >
                    {item.icon ? (
                      <div className="w-6 h-6 overflow-hidden">
                        <Media resource={item.icon} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke={item.accent || '#7c3aed'} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug" style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}>
                      {item.title}
                    </h3>
                    {item.organization && (
                      <p className="text-[13px] font-medium mt-0.5" style={{ color: item.accent || '#a78bfa' }}>
                        {item.organization}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-[11px] mt-1" style={{ color: isDark ? 'rgba(232,224,255,0.4)' : '#8a7bb0', fontFamily: "'JetBrains Mono', monospace" }}>
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export { FormationBlockComponent as FormationBlock }
