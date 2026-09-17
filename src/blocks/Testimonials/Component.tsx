'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'
import { LiquidEtherBackground } from '@/components/custom/LiquidEtherBackground'

type Props = {
  disableInnerContainer?: boolean
} & TestimonialsBlockType

type Testimonial = NonNullable<TestimonialsBlockType['testimonials']>[0]

const easeFluid = [0.16, 1, 0.3, 1] as const

const TestimonialsBlockComponent: React.FC<Props> = ({
  title,
  subtitle,
  description,
  testimonials,
  displayStyle,
  autoplaySpeed,
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const featured = testimonials?.filter((t) => t.featured) || []
  const displayTestimonials = featured.length > 0 ? featured : testimonials || []

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
  }, [displayTestimonials.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
  }, [displayTestimonials.length])

  useEffect(() => {
    if (displayStyle !== 'carousel' || displayTestimonials.length <= 1) return
    const interval = setInterval(nextSlide, autoplaySpeed || 5000)
    return () => clearInterval(interval)
  }, [displayStyle, displayTestimonials.length, autoplaySpeed, nextSlide])

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className="w-3.5 h-3.5"
        style={{ color: i < rating ? '#eab308' : isDark ? 'rgb(51 65 85)' : 'rgb(203 213 225)' }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))

  const headerVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeFluid } },
  }

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.97 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: easeFluid },
    },
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
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
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

        {displayStyle === 'carousel' && (
          <div className="relative max-w-2xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: easeFluid }}
                >
                  {displayTestimonials[currentIndex] && (
                    <TestimonialCard testimonial={displayTestimonials[currentIndex]} renderStars={renderStars} isDark={isDark} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {displayTestimonials.length > 1 && (
              <motion.div
                className="flex items-center justify-center gap-4 mt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: isDark ? 'rgba(23,20,42,0.8)' : 'rgba(250,247,255,0.8)', color: isDark ? '#c4b5fd' : '#7c3aed' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex gap-1.5">
                  {displayTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                      className="transition-all duration-500"
                      style={{
                        width: i === currentIndex ? 20 : 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: i === currentIndex ? '#7c3aed' : isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)',
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: isDark ? 'rgba(23,20,42,0.8)' : 'rgba(250,247,255,0.8)', color: isDark ? '#c4b5fd' : '#7c3aed' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </div>
        )}

        {(displayStyle === 'grid' || displayStyle === 'single') && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {(displayStyle === 'single' ? (featured.length > 0 ? [featured[0]] : testimonials?.slice(0, 1)) : testimonials)?.map((testimonial, index) => (
              <motion.div key={index} variants={getCardVariants()}>
                <TestimonialCard testimonial={testimonial} renderStars={renderStars} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

const TestimonialCard: React.FC<{
  testimonial: Testimonial
  renderStars: (rating: number) => React.ReactNode
  isDark: boolean
}> = ({ testimonial, renderStars, isDark }) => (
  <div
    className="relative isolate overflow-hidden rounded-2xl border p-6 h-full"
    style={{
      backgroundColor: isDark ? 'rgba(23,20,42,0.7)' : '#ffffff',
      borderColor: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)',
      boxShadow: isDark
        ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)'
        : '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget
      el.style.boxShadow = isDark
        ? '0 20px 40px -8px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.3)'
        : '0 20px 40px -8px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.04)'
      el.style.transform = 'translateY(-3px)'
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget
      el.style.boxShadow = isDark
        ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)'
        : '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)'
      el.style.transform = 'translateY(0)'
    }}
  >
    <LiquidEtherBackground />

    <div className="flex gap-0.5 mb-4">{renderStars(testimonial.rating || 5)}</div>

    <blockquote
      className="text-sm leading-relaxed mb-5 italic"
      style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }}
    >
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>

    <div className="flex items-center gap-3">
      {testimonial.authorAvatar ? (
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
          style={{ boxShadow: `0 0 0 2px ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'}` }}
        >
          <Media resource={testimonial.authorAvatar} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
        >
          <span className="text-white text-sm font-semibold">{testimonial.authorName?.charAt(0) || '?'}</span>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold" style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}>
          {testimonial.authorName}
        </p>
        <p className="text-xs" style={{ color: isDark ? 'rgba(232,224,255,0.45)' : '#8a7bb0' }}>
          {testimonial.authorTitle}{testimonial.authorOrganization && `, ${testimonial.authorOrganization}`}
        </p>
      </div>
    </div>
  </div>
)

export { TestimonialsBlockComponent as TestimonialsBlock }
