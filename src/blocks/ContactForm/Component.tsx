'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import type { ContactFormBlock as ContactFormBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { Particles } from '@/components/custom/Particles'
import { SectionLabel } from '@/components/custom/SectionLabel'

type Props = {
  disableInnerContainer?: boolean
} & ContactFormBlockType

const easeFluid = [0.16, 1, 0.3, 1] as const

const ContactFormBlockComponent: React.FC<Props> = ({
  title,
  codeLabel,
  subtitle,
  description,
  successMessage,
  buttonText,
  email,
  phone,
  socialLinks,
  showParticles,
  backgroundImage,
  disableInnerContainer: _disableInnerContainer,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sectionY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const headerVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeFluid } },
  }

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 ${
    isDark
      ? 'bg-[rgb(23,20,42)] border-[rgba(139,92,246,0.2)] text-[#e8e0ff] placeholder-[rgba(232,224,255,0.4)] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20'
      : 'bg-white border-[rgba(139,92,246,0.3)] text-[#2a2140] placeholder-[#8a7bb0] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20'
  }`

  const hasContactInfo = email || phone || (socialLinks && socialLinks.length > 0)

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden will-change-transform"
      style={{ backgroundColor: isDark ? '#0c0a14' : '#fbfaff' }}
    >
      {showParticles && <Particles count={15} />}

      {backgroundImage && (
        <motion.div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]" style={{ y: sectionY }}>
          <Media resource={backgroundImage} className="w-full h-full object-cover" fill />
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel code={codeLabel} />
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 pt-20"
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
          className="max-w-3xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeFluid, delay: 0.2 }}
        >
          <div
            className="rounded-2xl p-8"
            style={{
              border: '1px solid rgba(139,92,246,0.15)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {hasContactInfo && (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: '#7c3aed' }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {email}
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid rgba(139,92,246,0.4)',
                      color: '#c4b5fd',
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h.372c.516 0 .966.351 1.091.852l1.106 4.423a1.125 1.125 0 01-.677 1.291l-1.369.548a14.007 14.007 0 006.185 6.185l.548-1.369a1.125 1.125 0 011.291-.677l4.423 1.106c.501.125.852.575.852 1.091V19a2 2 0 01-2 2h-1A17 17 0 013 5z" />
                    </svg>
                    {phone}
                  </a>
                )}
              </div>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <>
                <div className="h-px mb-6" style={{ background: 'rgba(139,92,246,0.12)' }} />
                <div className="flex justify-center gap-4 flex-wrap mb-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        border: '1px solid rgba(139,92,246,0.4)',
                        color: '#c4b5fd',
                      }}
                    >
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                      </svg>
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="h-px mb-6" style={{ background: 'rgba(139,92,246,0.12)' }} />
              </>
            )}

            {status === 'success' ? (
              <motion.div
                className="text-center p-8 rounded-2xl border"
                style={{
                  backgroundColor: isDark ? 'rgba(23,20,42,0.7)' : '#ffffff',
                  borderColor: isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.3)',
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: easeFluid }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(52,211,153,0.2)' }}>
                  <svg className="w-6 h-6" style={{ color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{ color: isDark ? '#e8e0ff' : '#2a2140' }}>
                  {successMessage}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === 'sending' ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    buttonText || 'Send Message'
                  )}
                </motion.button>

                {status === 'error' && (
                  <motion.p
                    className="text-sm text-red-500 text-center"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export { ContactFormBlockComponent as ContactFormBlock }
