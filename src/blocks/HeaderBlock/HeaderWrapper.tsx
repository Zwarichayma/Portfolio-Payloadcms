'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'

interface HeaderWrapperProps {
  children: React.ReactNode
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div 
      className="fixed top-0 left-0 z-50 lg:h-[83px] w-full lg:w-[calc(100%-var(--sidebar-width,0px))] transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
        boxShadow: theme === 'dark' 
          ? '0px 1px 0px 0px rgba(255,255,255,0.1)' 
          : '0px 1px 0px 0px #BFC6CC80'
      }}
    >
      {children}
    </div>
  )
}