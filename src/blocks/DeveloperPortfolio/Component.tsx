'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { DeveloperPortfolioBlock } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  disableInnerContainer?: boolean
} & DeveloperPortfolioBlock

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [currentIndex, text])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="border-r-2 border-blue-600 ml-1"
      />
    </span>
  )
}

const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-600/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  )
}

const SocialIcon: React.FC<{ platform: string; url: string }> = ({ platform, url }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      case 'twitter':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )
      case 'email':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.636l8.728 6.545 8.728-6.545h1.636c.904 0 1.636.732 1.636 1.636z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        )
    }
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {getIcon(platform)}
    </motion.a>
  )
}

export const DeveloperPortfolioBlock: React.FC<Props> = ({
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
    <div className="relative min-h-screen bg-white overflow-hidden">
      {showParticles && <ParticleBackground />}
      
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
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
            <div className="text-center lg:text-left text-gray-900 order-2 lg:order-1">
              {/* Name */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
                className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6"
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
                className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
                variants={getAnimationVariants()}
              >
                {description}
              </motion.p>

              {/* Skills */}
              {skills && skills.length > 0 && (
                <motion.div className="mb-8" variants={getAnimationVariants()}>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Skills</h3>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {skills.map((skillItem, index) => (
                      <motion.span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          skillItem.level === 'expert'
                            ? 'bg-purple-100 text-purple-800 border border-purple-300'
                            : skillItem.level === 'advanced'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : skillItem.level === 'intermediate'
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {skillItem.skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

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
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      
      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {['</>', '{}', '[]', '()', ';;', '&&'].map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-600/20 text-2xl font-mono"
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