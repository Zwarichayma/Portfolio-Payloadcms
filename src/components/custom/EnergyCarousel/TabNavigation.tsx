'use client'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface Tab {
  id: number
  title: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: number
  onTabChange: (tabId: number) => void
}

// Constantes pour TabNavigation
const TAB_HEIGHT = 40
const TAB_MIN_WIDTH = 210
const TAB_HORIZONTAL_PADDING = 70

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const [tabWidths, setTabWidths] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Trouver l'index de l'onglet actif
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

  useEffect(() => {
    if (!containerRef.current) return

    const measureTextWidths = () => {
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.visibility = 'hidden'
      tempDiv.style.whiteSpace = 'nowrap'
      tempDiv.style.font = 'bold 16px Karla'
      document.body.appendChild(tempDiv)

      const widths = tabs.map((tab) => {
        tempDiv.textContent = tab.title
        const textWidth = tempDiv.offsetWidth
        const calculatedWidth = Math.ceil(textWidth + TAB_HORIZONTAL_PADDING)
        const maxWidthForThreeWords = calculateMaxWidthForThreeWords(tab.title)
        return Math.min(maxWidthForThreeWords, Math.max(TAB_MIN_WIDTH, calculatedWidth))
      })

      document.body.removeChild(tempDiv)
      return widths
    }

    const calculateMaxWidthForThreeWords = (text: string) => {
      const words = text.split(/\s+/)
      if (words.length <= 3) {
        return TAB_MIN_WIDTH + (text.length + 30) * 10
      } else {
        const threeWords = words.slice(0, 3).join(' ')
        const tempDiv = document.createElement('div')
        tempDiv.style.position = 'absolute'
        tempDiv.style.visibility = 'hidden'
        tempDiv.style.whiteSpace = 'nowrap'
        tempDiv.style.font = 'bold 16px Karla'
        document.body.appendChild(tempDiv)
        tempDiv.textContent = threeWords + '...'
        const threeWordsWidth = tempDiv.offsetWidth
        document.body.removeChild(tempDiv)
        return Math.ceil(threeWordsWidth + TAB_HORIZONTAL_PADDING)
      }
    }

    setTabWidths(measureTextWidths())
  }, [tabs])

  const totalWidth = tabWidths.reduce((sum, width) => sum + width, 0)

  if (tabWidths.length === 0) {
    return <div ref={containerRef} className="flex justify-center mb-64 h-[40px]" />
  }

  return (
    <div className="flex justify-center mb-64">
      <div
        ref={containerRef}
        className="relative box-border"
        style={{
          width: `${totalWidth}px`,
          height: `${TAB_HEIGHT}px`,
        }}
      >
        <div
          className="bg-white/10 border border-[rgba(191,198,204,0.5)] rounded-[20px] box-border"
          style={{
            width: `${totalWidth}px`,
            height: `${TAB_HEIGHT}px`,
          }}
        />

        <motion.div
          className="absolute top-0 bg-white rounded-[20px] box-border"
          animate={{
            left: `${tabWidths.slice(0, activeIndex).reduce((sum, width) => sum + width, 0)}px`,
            width: `${tabWidths[activeIndex]}px`,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          style={{
            height: `${TAB_HEIGHT}px`,
            border: '1px solid var(--primary)',
            boxShadow:
              '50px 29px 23px rgba(57, 125, 255, 0.01), 28px 17px 20px rgba(57, 125, 255, 0.05), 13px 7px 15px rgba(57, 125, 255, 0.09), 3px 2px 8px rgba(57, 125, 255, 0.1)',
          }}
        />

        <div className="absolute top-0 left-0 flex w-full">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex items-center justify-center font-karla font-bold text-[16px] leading-[140%] text-center tracking-[-0.03em] overflow-hidden"
              style={{
                width: `${tabWidths[index]}px`,
                height: `${TAB_HEIGHT}px`,
              }}
              animate={{
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--gray-200)',
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              <span
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  paddingLeft: `${TAB_HORIZONTAL_PADDING / 2}px`,
                  paddingRight: `${TAB_HORIZONTAL_PADDING / 2}px`,
                }}
              >
                {tab.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
