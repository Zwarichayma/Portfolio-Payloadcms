'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { DeveloperPortfolioBlock as DeveloperPortfolioBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { useTheme } from '@/providers/Theme'
import { 
  TypewriterText, 
  ParticleBackground, 
  SocialIcon, 
  DeveloperPortfolioThemeToggle 
} from './components'

type Props = {
  disableInnerContainer?: boolean
} & DeveloperPortfolioBlockType

const DeveloperPortfolioBlockComponent: React.FC<Props> = ({
  name,
  title,
  description,
  skills,
  profileImage,
  backgroundImage,
  socialLinks,
  animationStyle,
  showParticles,
  disableInnerContainer,
}) => {
  const { theme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)
  
  // Update current theme when theme changes
  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        repeat: 5,
        repeatType: 'mirror' as const,
      },
    },
  }

  const getAnimationVariants = () => {
    switch (animationStyle) {
      case 'slideUp':
        return itemVariants
      case 'glitch':
        return glitchVariants
      default:
        return itemVariants
    }
  }

  return (
    <div 
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: currentTheme === 'dark' ? '#111827' : '#ffffff',
      }}
    >
      <DeveloperPortfolioThemeToggle />
      {showParticles && <ParticleBackground />}
      
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
        </div>
      )}

      <motion.div
        className={`relative z-10 ${
          disableInnerContainer ? '' : 'container mx-auto px-6'
        } flex items-center justify-center min-h-screen`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-6xl">
          {/* Grid Layout - 2 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Content Section */}
            <div className="text-center lg:text-left text-gray-900 dark:text-white order-2 lg:order-1 transition-colors duration-300">
              {/* Name */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                variants={getAnimationVariants()}
              >
                {animationStyle === 'typewriter' ? (
                  <TypewriterText text={name || ''} />
                ) : (
                  name
                )}
              </motion.h1>

              {/* Title */}
              <motion.h2
                className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300"
                variants={getAnimationVariants()}
              >
                {animationStyle === 'typewriter' ? (
                  <TypewriterText text={title || ''} delay={1000} />
                ) : (
                  title
                )}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors duration-300"
                variants={getAnimationVariants()}
              >
                {description}
              </motion.p>

             

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <motion.div
                  className="flex justify-center lg:justify-start space-x-6"
                  variants={getAnimationVariants()}
                >
                  {socialLinks.map((link, index) => (
                    <SocialIcon
                      key={index}
                      platform={link.platform}
                      url={link.url}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Profile Image Section */}
            {profileImage && (
              <motion.div
                className="flex justify-center order-1 lg:order-2"
                variants={getAnimationVariants()}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <Media resource={profileImage} className="w-full h-full object-cover" />
                </motion.div>
              </motion.div>
            )}
            
          </div>
        </div>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white dark:from-gray-900 to-transparent transition-colors duration-300" />
      
      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {['</>', '{}', '[]', '()', ';;', '&&'].map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-600/20 dark:text-blue-400/20 text-2xl font-mono transition-colors duration-300"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { DeveloperPortfolioBlockComponent as DeveloperPortfolioBlock }