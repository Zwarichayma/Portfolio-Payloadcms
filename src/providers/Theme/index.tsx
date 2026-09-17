'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './ThemeSelector/types'

import {
  defaultTheme,
  getImplicitPreference,
  setThemeCookie,
  themeCookieKey,
  themeLocalStorageKey,
} from './ThemeSelector/types'
import { themeIsValid } from './ThemeSelector/types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({
  children,
  initialTheme = defaultTheme,
}: {
  children: React.ReactNode
  initialTheme?: Theme
}) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey)
      setThemeCookie(null)
      const implicitPreference = getImplicitPreference()
      document.documentElement.setAttribute('data-theme', implicitPreference || '')
      if (implicitPreference) setThemeState(implicitPreference)
    } else {
      setThemeState(themeToSet)
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
      setThemeCookie(themeToSet)
      document.documentElement.setAttribute('data-theme', themeToSet)
    }
  }, [])

  useEffect(() => {
    let themeToSet: Theme = initialTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    const cookiePreference = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${themeCookieKey}=([^;]+)`),
    )?.[1]

    if (themeIsValid(preference)) {
      themeToSet = preference
      // Keep the cookie in sync so the server can render the right theme next time
      setThemeCookie(preference)
    } else if (themeIsValid(cookiePreference)) {
      themeToSet = cookiePreference
    } else {
      // "Auto": follow the OS preference without persisting it
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
    setThemeState(themeToSet)
  }, [initialTheme])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
