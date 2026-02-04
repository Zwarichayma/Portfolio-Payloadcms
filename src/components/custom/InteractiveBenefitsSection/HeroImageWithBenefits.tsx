import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Media as MediaComponent } from '@/components/Media'
import { BenefitCard } from './BenefitCard'
import { Presentation, BenefitCardData, HeroImageWithBenefitsProps } from './types'

export function HeroImageWithBenefits({
  presentations,
  currentPresentation,
  currentBenefits,
}: HeroImageWithBenefitsProps) {
  const current = presentations[currentPresentation]

  return (
    <div className="col-span-3 relative flex justify-center" style={{ height: '562px' }}>
      <div className="relative w-[615px] h-[562px] flex items-center justify-center overflow-hidden">
        {/* Images statiques */}
        {presentations.map((presentation, idx) => (
          <div
            key={idx}
            className="absolute top-0 left-0 w-[615px] h-[562px]"
            style={{
              opacity: idx === currentPresentation ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              zIndex: idx === currentPresentation ? 2 : 1,
            }}
          >
            <MediaComponent
              resource={presentation.image}
              alt={presentation.title}
              size={presentation.image?.sizes?.small?.url ?? undefined}
              imgClassName="h-[562px] w-auto object-contain"
            />
          </div>
        ))}

        {/* Animation de morphing */}
        <AnimatePresence>
          <motion.div
            key={currentPresentation}
            className="absolute top-0 left-0 w-[615px] h-[562px] flex items-center justify-center"
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            exit={{ filter: 'blur(10px)', opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <MediaComponent
              resource={current.image}
              alt={current.title}
              size={current.image?.sizes?.small?.url ?? undefined}
              imgClassName="h-[562px] w-auto object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Benefit Cards */}
      <AnimatePresence>
        {currentBenefits.map((benefit, index) => (
          <BenefitCard key={index} text={benefit.text} position={benefit.position} />
        ))}
      </AnimatePresence>
    </div>
  )
}
