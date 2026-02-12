'use client'

import { MobileMenuContent } from '@/blocks/HeaderBlock/MobileMenuContent'
import type { Header as HeaderType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useTheme } from '@/providers/Theme'
import React, { useEffect, useState } from 'react'

export const MobileMenuButton: React.FC<{
  menus: HeaderType['menus']
  ctaButton: HeaderType['ctaButton']
  consultantButton: HeaderType['consultantButton']
}> = ({ menus, ctaButton, consultantButton }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  // Get theme-aware styles
  const getStyles = () => ({
    hamburgerColor: theme === 'dark' ? '#F9FAFB' : '#111827', // gray-50 : gray-900
    menuBg: theme === 'dark' ? '#111827' : '#ffffff', // gray-900 : white
  })

  const styles = getStyles()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1 z-50"
        aria-label="Toggle menu"
      >
        <span
          className={cn(
            'block w-6 h-0.5 transition-all duration-300',
            isOpen ? 'rotate-45 translate-y-2' : '',
          )}
          style={{ backgroundColor: styles.hamburgerColor }}
        />
        <span
          className={cn(
            'block w-6 h-0.5 transition-all duration-300',
            isOpen ? 'opacity-0' : '',
          )}
          style={{ backgroundColor: styles.hamburgerColor }}
        />
        <span
          className={cn(
            'block w-6 h-0.5 transition-all duration-300',
            isOpen ? '-rotate-45 -translate-y-2' : '',
          )}
          style={{ backgroundColor: styles.hamburgerColor }}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-[64px] lg:hidden z-40 h-[calc(100vh-64px)] overflow-y-auto transition-all duration-300',
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4',
        )}
        style={{ 
          display: isOpen ? 'block' : 'none',
          backgroundColor: styles.menuBg
        }}
      >
        <MobileMenuContent
          menus={menus}
          ctaButton={ctaButton}
          consultantButton={consultantButton}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      </div>
    </>
  )
}
