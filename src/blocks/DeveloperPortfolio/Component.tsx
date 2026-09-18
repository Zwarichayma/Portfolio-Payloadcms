'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import type { DeveloperPortfolioBlock as DeveloperPortfolioBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { LiquidEtherBackground } from '@/components/custom/LiquidEtherBackground'
import { Starfield } from '@/components/custom/Starfield'
import {
  TypewriterText,
  ParticleBackground,
  SocialIcon,
} from './components'

type Props = {
  disableInnerContainer?: boolean
} & DeveloperPortfolioBlockType

const easeOut = [0.16, 1, 0.3, 1] as const
const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const

const MONO = "'JetBrains Mono', monospace"

const toIdentifier = (value?: string | null): string => {
  if (!value) return ''
  const identifier = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s$_]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('')
  if (!identifier) return ''
  return /^[0-9]/.test(identifier) ? `_${identifier}` : identifier
}

const DeveloperPortfolioBlockComponent: React.FC<Props> = ({
  name,
  title,
  description,
  profileImage,
  backgroundImage,
  socialLinks,
  statusBadge,
  location,
  codeCard,
  stats,
  showStats,
  animationStyle,
  showParticles,
  disableInnerContainer: _disableInnerContainer,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: easeSmooth },
    },
  }

  const imageVariants: Variants = {
    hidden: { scale: 0.85, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut },
    },
  }

  const getAnimationVariants = (): Variants => {
    if (animationStyle === 'glitch') {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.08,
            repeat: 4,
            repeatType: 'mirror' as const,
          },
        },
      }
    }
    return itemVariants
  }

  const codeLines = codeCard?.lines || []
  const storedVariable = codeCard?.variableName?.trim()
  const codeVariable =
    (storedVariable && storedVariable !== 'developer' ? storedVariable : '') ||
    toIdentifier(title) ||
    'developer'

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden will-change-transform flex items-center justify-center pt-40 pb-24 lg:pt-28 lg:pb-16"
      style={{ backgroundColor: isDark ? '#0c0a14' : '#fbfaff' }}
    >
      <Starfield />

      {showParticles && <ParticleBackground />}

      {backgroundImage && (
        <motion.div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.04]" style={{ y: bgY }}>
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
        </motion.div>
      )}

      {/* Background mesh + grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(109,40,217,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(124,58,237,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
      >
        <motion.div
          className="w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-1">
              {statusBadge && (
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-8"
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    color: '#a78bfa',
                    fontWeight: 500,
                  }}
                  variants={itemVariants}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
                  {statusBadge}
                </motion.div>
              )}

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 will-change-transform"
                style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}
                variants={getAnimationVariants()}
              >
                {animationStyle === 'typewriter' ? (
                  <TypewriterText text={name || ''} />
                ) : (
                  name
                )}
              </motion.h1>

              <motion.div
                className="flex items-center justify-center lg:justify-start gap-3 mb-6"
                variants={getAnimationVariants()}
              >
                <span className="font-semibold text-xl" style={{ color: '#a78bfa' }}>
                  {title}
                </span>
                {location && (
                  <>
                    <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(167,139,250,0.4)' }} />
                    <span className="text-sm flex items-center gap-1" style={{ color: isDark ? 'rgba(232,224,255,0.45)' : 'rgba(42,33,64,0.5)' }}>
                      <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {location}
                    </span>
                  </>
                )}
              </motion.div>

              <motion.p
                className="text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 will-change-transform"
                style={{ color: isDark ? 'rgba(232,224,255,0.55)' : 'rgba(42,33,64,0.55)', fontWeight: 300 }}
                variants={getAnimationVariants()}
              >
                {description}
              </motion.p>

              {socialLinks && socialLinks.length > 0 && (
                <motion.div
                  className="flex justify-center lg:justify-start gap-5"
                  variants={getAnimationVariants()}
                >
                  {socialLinks.map((link, index) => (
                    <SocialIcon key={index} platform={link.platform || ''} url={link.url || ''} />
                  ))}
                </motion.div>
              )}
            </div>

            <div className="order-2 flex flex-col gap-4">
              {/* Code card */}
              <motion.div
                className="w-full rounded-2xl overflow-hidden will-change-transform"
                style={{ border: '1px solid rgba(139,92,246,0.18)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)' }}
                variants={imageVariants}
              >
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ borderColor: 'rgba(139,92,246,0.12)', background: 'rgba(124,58,237,0.06)' }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                  <span className="ml-3 text-xs" style={{ color: 'rgba(167,139,250,0.6)', fontFamily: MONO }}>
                    {codeCard?.title || 'profile.ts'}
                  </span>
                </div>
                <div className="p-6" style={{ fontFamily: MONO, fontSize: '0.8rem', lineHeight: 1.8 }}>
                  <div style={{ color: '#6d28d9' }}>
                    const <span style={{ color: '#a78bfa' }}>{codeVariable}</span> = {'{'}
                  </div>
                  {codeLines.map((line, index) => (
                    <div key={index} className="ml-4">
                      <span style={{ color: '#c4b5fd' }}>{line.key}</span>
                      <span style={{ color: isDark ? 'rgba(232,224,255,0.4)' : 'rgba(42,33,64,0.4)' }}>: </span>
                      <span style={{ color: line.color || '#34d399' }}>{line.value}</span>
                      <span style={{ color: isDark ? 'rgba(232,224,255,0.3)' : 'rgba(42,33,64,0.3)' }}>,</span>
                    </div>
                  ))}
                  <div style={{ color: '#6d28d9' }}>{'}'}</div>
                  {codeCard?.footerText && (
                    <div className="mt-3 flex items-center gap-1" style={{ color: 'rgba(167,139,250,0.5)' }}>
                      <span className="animate-pulse" style={{ color: '#7c3aed' }}>▋</span>
                      <span>{codeCard.footerText}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Profile image (optional, replaces code card) */}
              {!codeCard?.title && profileImage && (
                <motion.div className="flex justify-center will-change-transform" variants={imageVariants} style={{ scale: imageScale, opacity: imageOpacity }}>
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-[2rem] opacity-30 blur-xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }} />
                    <div
                      className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden"
                      style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.25), 0 20px 60px -12px rgba(124,58,237,0.35)' }}
                    >
                      <Media resource={profileImage} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stats row */}
              {showStats && stats && stats.length > 0 && (
                <motion.div
                  className="grid grid-cols-3 gap-3"
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="relative isolate overflow-hidden rounded-xl p-4 text-center"
                      style={{
                        border: '1px solid rgba(139,92,246,0.12)',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(20px)',
                      }}
                      variants={imageVariants}
                    >
                      <LiquidEtherBackground />

                      <div className="text-2xl font-bold mb-0.5" style={{ color: '#c4b5fd' }}>{stat.value}</div>
                      <div className="text-xs" style={{ color: isDark ? 'rgba(232,224,255,0.4)' : 'rgba(42,33,64,0.4)', lineHeight: 1.3 }}>{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${isDark ? '#0c0a14' : '#fbfaff'}, transparent)` }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['</>', '{}', '[]', '()', ';;', '&&'].map((symbol, index) => {
          const xStart = 10 + index * 15
          const yBase = 15 + (index % 3) * 30
          return (
            <motion.div
              key={index}
              className="absolute font-mono select-none will-change-transform"
              style={{
                color: isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.06)',
                fontSize: 20,
                left: `${xStart}%`,
                top: `${yBase}%`,
              }}
              animate={{
                y: [0, -16, 0, 12, 0],
                x: [0, 8, -4, 6, 0],
                opacity: [0.06, 0.18, 0.1, 0.15, 0.06],
                scale: [1, 1.05, 0.98, 1.02, 1],
              }}
              transition={{
                duration: 7 + index * 0.8,
                repeat: Infinity,
                delay: index * 0.6,
                ease: 'easeInOut',
              }}
            >
              {symbol}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export { DeveloperPortfolioBlockComponent as DeveloperPortfolioBlock }
