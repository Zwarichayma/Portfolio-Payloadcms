'use client'

import React from 'react'
import { Button } from '@payloadcms/ui'
import { useConfig } from '@payloadcms/ui'
import { useTheme as usePayloadTheme } from '@payloadcms/ui'

export const PayloadThemeToggle: React.FC = () => {
  const { theme, setTheme } = usePayloadTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <Button
      onClick={toggleTheme}
      buttonStyle="icon-label"
      icon={theme === 'dark' ? 'sun' : 'moon'}
      tooltip={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
      size="small"
    />
  )
}