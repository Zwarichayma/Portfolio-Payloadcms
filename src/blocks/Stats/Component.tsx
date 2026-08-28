'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import type { StatsBlock as StatsBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'

type Props = {
  disableInnerContainer?: boolean
} & StatsBlockType

const easeFluid = [0.16, 1, 0.3, 1] as const

const StatsBlockComponent: React.FC<Props> = ({
  title,
  subtitle,
  stats,
  columns,
  showParticles,
  backgroundImage,
  disableInnerContainer: _disableInnerContainer,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sectionY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  const getColumns = () => {
    switch (columns) {
      case '4': return 'grid-cols-2 md:grid-cols-4'
      case '6': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
      default: return 'grid-cols-3'
    }
  }

  const headerVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeFluid } },
  }

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeFluid } },
  }

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden will-change-transform"
      style={{ backgroundColor: isDark ? '#0c0a14' : '#fbfaff' }}
    >
      {showParticles && <Particles count={15} />}

      {backgroundImage && (
        <motion.div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]" style={{ y: sectionY }}>
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {title && (
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
            )}
            {subtitle && (
              <motion.p className="text-base font-medium" style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }} variants={headerVariants}>
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        <motion.div
          className={`grid ${getColumns()} gap-4 max-w-4xl mx-auto`}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {(stats || []).map((stat, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-6 text-center"
              style={{
                border: '1px solid rgba(139,92,246,0.12)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
              }}
              variants={cardVariants}
            >
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#c4b5fd' }}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm" style={{ color: isDark ? 'rgba(232,224,255,0.45)' : '#8a7bb0', lineHeight: 1.3 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export { StatsBlockComponent as StatsBlock }
