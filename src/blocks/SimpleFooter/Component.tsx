'use client'

import React from 'react'
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

  const hasExtra = Boolean(
    title || tagline || (socialLinks && socialLinks.length > 0) || (links && links.length > 0),
  )

  return (
    <footer
      className="py-8"
      style={{
        borderTop: '1px solid rgba(139,92,246,0.1)',
        backgroundColor: isDark ? '#0c0a14' : '#fbfaff',
      }}
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        {hasExtra && (
          <div className="mb-6">
            {title && (
              <p
                className="mb-1 text-sm font-semibold"
                style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }}
              >
                {title}
              </p>
            )}

            {tagline && (
              <p
                className="mb-4 text-xs"
                style={{ color: isDark ? 'rgba(232,224,255,0.45)' : '#8a7bb0' }}
              >
                {tagline}
              </p>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <div className="mb-4 flex items-center justify-center gap-5">
                {socialLinks.map((link, index) => (
                  <SocialIcon key={index} platform={link.platform || ''} url={link.url || ''} />
                ))}
              </div>
            )}

            {links && links.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url || '#'}
                    className="text-xs transition-colors duration-300 hover:text-[#a78bfa]"
                    style={{ color: isDark ? '#c4b5fd' : '#4b3f73' }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}

        {copyright && (
          <p
            className="text-xs"
            style={{
              color: isDark ? 'rgba(232,224,255,0.25)' : 'rgba(42,33,64,0.4)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {copyright}
          </p>
        )}
      </div>
    </footer>
  )
}

export { SimpleFooterBlockComponent as SimpleFooterBlock }
