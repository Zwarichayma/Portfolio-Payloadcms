'use client'

import React, { useEffect, useState } from 'react'
import LiquidEther from './LiquidEther'
import { useTheme } from '@/providers/Theme'

const LIQUID_COLORS = ['#3b3168', '#6b5a8c', '#4a3d75']

const MAX_LIQUID_INSTANCES = 8

let activeInstances = 0

interface LiquidEtherBackgroundProps {
  scrim?: boolean
}

export const LiquidEtherBackground: React.FC<LiquidEtherBackgroundProps> = ({ scrim = true }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (activeInstances >= MAX_LIQUID_INSTANCES) return
    activeInstances += 1
    setEnabled(true)
    return () => {
      activeInstances -= 1
    }
  }, [])

  return (
    <>
      {enabled && (
        <div className="pointer-events-none absolute inset-0 z-[-1]">
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
            backgroundColor={isDark ? '#0c0a14' : '#fbfaff'}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      {scrim && (
        <div
          className="pointer-events-none absolute inset-0 z-[-1]"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(12,10,20,0.3) 0%, rgba(12,10,20,0.62) 100%)'
              : 'linear-gradient(180deg, rgba(251,250,255,0.34) 0%, rgba(251,250,255,0.7) 100%)',
          }}
        />
      )}
    </>
  )
}
