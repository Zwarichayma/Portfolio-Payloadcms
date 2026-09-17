'use client'

import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CardSwapProps {
  children: ReactNode[]
  delay?: number
  pauseOnHover?: boolean
  className?: string
  cardDistance?: number
  verticalDistance?: number
}

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`w-full h-full ${className}`}>{children}</div>
}

const CardSwap: React.FC<CardSwapProps> = ({
  children,
  delay = 5000,
  pauseOnHover = false,
  className = '',
  cardDistance = 70,
  verticalDistance = 50,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cards = React.Children.toArray(children)

  const nextCard = useCallback(() => {
    if (pauseOnHover && isHovered) return
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }, [cards.length, isHovered, pauseOnHover])

  useEffect(() => {
    if (cards.length <= 1) return
    const interval = setInterval(nextCard, delay)
    return () => clearInterval(interval)
  }, [nextCard, delay, cards.length])

  const visibleIndexes: number[] = []
  for (let i = 0; i < Math.min(3, cards.length); i++) {
    visibleIndexes.push((currentIndex + i) % cards.length)
  }

  if (cards.length === 0) return null

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const position = visibleIndexes.indexOf(index)
          const isVisible = position !== -1

          return (
            <motion.div
              key={`card-${index}`}
              className="absolute inset-0"
              layout
              initial={false}
              animate={
                isVisible
                  ? {
                      zIndex: 3 - position,
                      scale: 1 - position * 0.05,
                      x: position * cardDistance,
                      y: position * verticalDistance,
                      opacity: 1 - position * 0.25,
                    }
                  : {
                      zIndex: 0,
                      scale: 0.85,
                      x: cardDistance * 2,
                      y: verticalDistance * 2,
                      opacity: 0,
                    }
              }
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -10,
                transition: { duration: 0.25 },
              }}
              transition={{
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => {
                if (!isVisible) setCurrentIndex(index)
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              {card}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {cards.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="transition-all duration-300"
              style={{
                width: index === currentIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  index === currentIndex
                    ? '#7c3aed'
                    : 'rgba(196, 181, 253, 0.4)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CardSwap
