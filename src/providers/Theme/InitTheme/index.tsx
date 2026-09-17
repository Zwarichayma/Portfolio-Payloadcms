import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeCookieKey, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function getImplicitPreference() {
      var mediaQuery = '(prefers-color-scheme: dark)'
      var mql = window.matchMedia(mediaQuery)
      var hasImplicitPreference = typeof mql.matches === 'boolean'

      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light'
      }

      return null
    }

    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    function getCookieTheme() {
      var key = '${themeCookieKey}='
      var parts = document.cookie ? document.cookie.split(';') : []
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i].trim()
        if (part.indexOf(key) === 0) {
          return decodeURIComponent(part.substring(key.length))
        }
      }
      return null
    }

    var themeToSet = '${defaultTheme}'
    var cookieTheme = getCookieTheme()
    var preference = window.localStorage.getItem('${themeLocalStorageKey}')

    if (themeIsValid(cookieTheme)) {
      themeToSet = cookieTheme
    } else if (themeIsValid(preference)) {
      themeToSet = preference

      // Migrate the localStorage preference to a cookie so the server can
      // render the correct theme on the next request.
      try {
        document.cookie = '${themeCookieKey}=' + themeToSet + '; path=/; max-age=31536000; samesite=lax'
      } catch (e) {}
    } else {
      // "Auto": follow the OS preference without persisting it
      var implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
