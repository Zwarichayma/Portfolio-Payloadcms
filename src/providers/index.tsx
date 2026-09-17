import React from 'react'

import type { Theme } from './Theme/ThemeSelector/types'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  initialTheme?: Theme
}> = ({ children, initialTheme }) => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </ThemeProvider>
  )
}
