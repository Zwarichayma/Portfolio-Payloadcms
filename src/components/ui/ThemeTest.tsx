'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'

export const ThemeTest: React.FC = () => {
  const { theme } = useTheme()
  
  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="font-semibold mb-2">Test du thème</h3>
      <p>Thème actuel: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{theme}</span></p>
      <p className="mt-2">Ce texte devrait changer de couleur selon le thème.</p>
      <div className="mt-3 p-3 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded">
        Cette boîte teste les couleurs conditionnelles.
      </div>
    </div>
  )
}