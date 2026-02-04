'use client'

import React, { createContext, useContext, useState, RefObject } from 'react'

interface MenuContextType {
  openMenu: string | null
  setOpenMenu: (menu: string | null) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
  headerRef: RefObject<HTMLElement> | null
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<{
  children: React.ReactNode
  headerRef: RefObject<HTMLElement>
}> = ({ children, headerRef }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <MenuContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        headerRef,
      }}
    >
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
