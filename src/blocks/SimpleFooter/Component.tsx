'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/Theme'
import { SocialIcon } from '@/blocks/DeveloperPortfolio/components'
import type { SimpleFooterBlock as SimpleFooterBlockType } from '@/payload-types'

type Props = {
  disableInnerContainer?: boolean
} & SimpleFooterBlockType

const SimpleFooterBlockComponent: React.FC<Props> = ({
  title,
  tagline,
  socialLinks,
  links,
  copyright,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const muted = isDark ? 'rgba(232,224,255,0.5)' : '#8a7bb0'
  const borderColor = isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.2)'

  return (
    <footer
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        backgroundColor: isDark ? '#0c0a14' : '#fbfaff',
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {title && (
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
        )}

        {tagline && (
          <p className="text-sm max-w-xl mx-auto" style={{ color: muted }}>
            {tagline}
          </p>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center items-center gap-6 my-8">
            {socialLinks.map((link, index) => (
              <SocialIcon key={index} platform={link.platform || ''} url={link.url || ''} />
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url || '#'}
                className="text-sm transition-colors duration-300 hover:text-[#a78bfa]"
                style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {copyright && (
          <div className="pt-6" style={{ borderTop: `1px solid ${borderColor}` }}>
            <p className="text-xs" style={{ color: muted }}>
              {copyright}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}

export { SimpleFooterBlockComponent as SimpleFooterBlock }
