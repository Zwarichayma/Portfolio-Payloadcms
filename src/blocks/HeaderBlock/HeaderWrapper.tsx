'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'
import LiquidEther from '@/components/custom/LiquidEther'

const LIQUID_COLORS = ['#3b3168', '#6b5a8c', '#4a3d75']

interface HeaderWrapperProps {
  children: React.ReactNode
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className="fixed top-0 left-0 z-50 lg:h-[83px] w-full lg:w-[calc(100%-var(--sidebar-width,0px))] transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#111827' : '#ffffff',
        boxShadow: isDark
          ? '0px 1px 0px 0px rgba(255,255,255,0.1)'
          : '0px 1px 0px 0px #BFC6CC80',
      }}
    >
      {/* Liquid Ether animation, clipped to the header */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <LiquidEther
          colors={LIQUID_COLORS}
          mouseForce={10}
          cursorSize={80}
          isViscous
          viscous={28}
          iterationsViscous={24}
          iterationsPoisson={24}
          resolution={0.4}
          isBounce={false}
          autoDemo
          autoSpeed={0.25}
          autoIntensity={0.9}
          takeoverDuration={0.25}
          autoResumeDelay={2500}
          autoRampDuration={0.6}
          lightMode={!isDark}
          backgroundColor={isDark ? '#111827' : '#ffffff'}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
