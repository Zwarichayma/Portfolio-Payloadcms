'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/ThemeSelector/types'

interface ThemeToggleButtonProps {
  className?: string
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center 
        w-10 h-10 p-2 
        rounded-lg
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={`Basculer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
      title={`Basculer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {/* Sun icon for light mode */}
      {theme === 'dark' && (
        <svg
          className="w-5 h-5 transform transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
      
      {/* Moon icon for dark mode */}
      {theme === 'light' && (
        <svg
          className="w-5 h-5 transform transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  )
}