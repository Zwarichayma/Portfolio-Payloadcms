'use client'
import React, { createContext, useContext, useState } from 'react'

interface MenuContextType {
  openMenu: string | null
  setOpenMenu: (menuType: string | null) => void
  headerRef?: React.RefObject<HTMLElement | null>
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<{
  children: React.ReactNode
  headerRef?: React.RefObject<HTMLElement | null>
}> = ({ children, headerRef }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu, headerRef }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
