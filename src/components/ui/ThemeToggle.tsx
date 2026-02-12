'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/ThemeSelector/types'

interface ThemeToggleProps {
  variant?: 'default' | 'mobile'
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'default', 
  className = '' 
}) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Get theme-aware styles
  const getMobileStyles = () => ({
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#D1D5DB' : '#374151', // gray-300 : gray-700
    borderTopColor: theme === 'dark' ? '#374151' : '#E5E7EB', // gray-700 : gray-200
  })

  const getDefaultStyles = () => ({
    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', // gray-800 : white
    color: theme === 'dark' ? '#D1D5DB' : '#4B5563', // gray-300 : gray-600
    borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB', // gray-600 : gray-200
    boxShadow: theme === 'dark' 
      ? '0 1px 2px 0 rgba(0, 0, 0, 0.3)' 
      : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  })

  const getHoverStyles = () => ({
    backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB', // gray-700 : gray-50
    borderColor: theme === 'dark' ? '#6B7280' : '#D1D5DB', // gray-500 : gray-300
  })

  if (variant === 'mobile') {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200 border-t ${className}`}
        style={{
          ...getMobileStyles(),
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
        }}
        onMouseEnter={(e) => {
          const hoverStyles = getHoverStyles()
          e.currentTarget.style.backgroundColor = hoverStyles.backgroundColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <span className="font-medium">
          Mode {theme === 'light' ? 'sombre' : 'clair'}
        </span>
        <div className="flex items-center">
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      style={getDefaultStyles()}
      onMouseEnter={(e) => {
        const hoverStyles = getHoverStyles()
        e.currentTarget.style.backgroundColor = hoverStyles.backgroundColor
        e.currentTarget.style.borderColor = hoverStyles.borderColor
        e.currentTarget.style.boxShadow = theme === 'dark' 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      onMouseLeave={(e) => {
        const defaultStyles = getDefaultStyles()
        e.currentTarget.style.backgroundColor = defaultStyles.backgroundColor
        e.currentTarget.style.borderColor = defaultStyles.borderColor
        e.currentTarget.style.boxShadow = defaultStyles.boxShadow
      }}
      aria-label={`Basculer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
      title={`Basculer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {theme === 'dark' && (
        <svg
          className="w-5 h-5 transform transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
      
      {theme === 'light' && (
        <svg
          className="w-5 h-5 transform transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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