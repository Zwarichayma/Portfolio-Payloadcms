export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void
  theme?: Theme | null
}

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'

export function themeIsValid(string: null | string): string is Theme {
  return string ? ['dark', 'light'].includes(string) : false
}

export const getImplicitPreference = (): Theme | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
