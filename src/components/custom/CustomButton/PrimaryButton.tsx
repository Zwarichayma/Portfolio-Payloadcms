import { easeInOut, motion } from 'motion/react'
import * as React from 'react'
import { useTheme } from '@/providers/Theme'

const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string
    showArrow?: boolean
    showArrowMobile?: boolean
    arrowPosition?: 'left' | 'right'
    animated?: boolean
    animationStyle?: any
    children: React.ReactNode
  }
>(
  (
    {
      className = '',
      showArrow = true,
      showArrowMobile = false,
      arrowPosition = 'right',
      animated,
      animationStyle,
      children,
      ...props
    },
    ref,
  ) => {
    const [isHovering, setIsHovering] = React.useState(false)
    const [isLeaving, setIsLeaving] = React.useState(false)
    const [isDesktop, setIsDesktop] = React.useState(false)
    const { theme } = useTheme()

    // Detect if device is desktop (has hover capability)
    React.useEffect(() => {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
      setIsDesktop(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    // Shine effect that appears during hover (left to right)
    const shineVariants = {
      initial: {
        left: '-150px',
        opacity: 0,
      },
      animate: {
        left: 'calc(100% + 150px)',
        opacity: [0, 1, 0] as number[],
        transition: {
          duration: 0.7,
          ease: easeInOut,
        },
      },
    }

    // Shine effect on leave (right to left)
    const shineReverseVariants = {
      initial: {
        left: 'calc(100% + 150px)',
        opacity: 0,
      },
      animate: {
        left: '-150px',
        opacity: [0, 1, 0] as number[],
        transition: {
          duration: 0.7,
          ease: easeInOut,
        },
      },
    }

    // Arrow animation - appears part by part with clipPath
    const arrowVariants = {
      hidden: {
        opacity: 0,
        scale: 0.8,
        clipPath: arrowPosition === 'right' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
      },
      visible: {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0 0% 0 0%)',
        transition: {
          opacity: { duration: 0.4, ease: easeInOut },
          scale: { duration: 0.4, ease: easeInOut },
          clipPath: { duration: 0.5, ease: easeInOut },
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        clipPath: arrowPosition === 'right' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
        transition: {
          opacity: { duration: 0.3, ease: easeInOut },
          scale: { duration: 0.3, ease: easeInOut },
          clipPath: { duration: 0.4, ease: easeInOut },
        },
      },
    }

    // Button width animation - dynamic padding based on arrow visibility
    const hasFullWidth = className.includes('w-full')
    const buttonVariants = {
      normal: {
        paddingLeft: '20px',
        paddingRight: '20px',
        gap: '0px',
        width: hasFullWidth ? '100%' : 'auto',
      },
      expanded: {
        paddingLeft: arrowPosition === 'left' ? '16px' : '20px',
        paddingRight: arrowPosition === 'right' ? '16px' : '20px',
        gap: '8px',
        width: hasFullWidth ? '100%' : 'auto',
      },
    }

    // Handle mouse leave with delay
    const handleMouseLeave = () => {
      if (!isDesktop) return // Disable hover on touch devices
      setIsHovering(false)
      setIsLeaving(true)
      setTimeout(() => setIsLeaving(false), 700)
    }

    // Handle mouse enter
    const handleMouseEnter = () => {
      if (!isDesktop) return // Disable hover on touch devices
      setIsHovering(true)
      setIsLeaving(false)
    }

    // Get theme-aware colors
    const getButtonColors = () => {
      if (theme === 'dark') {
        return {
          normal: '#7C3AED', // violet-600
          hover: '#6D28D9',   // violet-700
          shine: '#C4B5FD',   // violet-300
          text: '#FFFFFF',
          shadow: '0px 90px 36px rgba(124, 58, 237, 0.01), 0px 51px 30px rgba(124, 58, 237, 0.05), 0px 23px 23px rgba(124, 58, 237, 0.09), 0px 6px 12px rgba(124, 58, 237, 0.1)'
        }
      }
      return {
        normal: '#7C3AED',   // violet-600
        hover: '#6D28D9',    // violet-700
        shine: '#C4B5FD',    // violet-300
        text: '#FFFFFF',
        shadow: '0px 90px 36px rgba(124, 58, 237, 0.01), 0px 51px 30px rgba(124, 58, 237, 0.05), 0px 23px 23px rgba(124, 58, 237, 0.09), 0px 6px 12px rgba(124, 58, 237, 0.1)'
      }
    }

    const buttonColors = getButtonColors()

    return (
      <motion.button
        ref={ref}
        className={`relative overflow-hidden ${className.includes('w-full') ? 'flex' : 'inline-flex'} flex-row items-center justify-center py-[0.625rem] h-[40px] md:h-[3.1875rem] isolation-auto font-karla font-bold text-sm leading-[140%] tracking-[-3%] md:font-[inherit] md:text-[inherit] md:leading-[inherit] md:tracking-[inherit] ${className}`}
        data-animated={animated}
        initial="normal"
        animate={isDesktop && isHovering ? 'expanded' : 'normal'}
        variants={buttonVariants}
        transition={{
          duration: 0.5,
          ease: easeInOut,
        }}
        style={{
          backgroundColor: isDesktop && (isHovering || isLeaving) ? buttonColors.hover : buttonColors.normal,
          color: buttonColors.text,
          boxShadow:
            isDesktop && (isHovering || isLeaving)
              ? buttonColors.shadow
              : 'none',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Shine effect - diagonal slash / */}
        {isDesktop && isHovering && (
          <motion.div
            key="shine-forward"
            className="absolute top-1/2 w-[5.96px] h-[118px] pointer-events-none"
            style={{
              transform: 'translateY(-50%) rotate(19.03deg)',
              zIndex: 2,
              background: buttonColors.shine,
              filter: 'blur(7.5px)',
              borderRadius: '0px',
            }}
            variants={shineVariants}
            initial="initial"
            animate="animate"
          />
        )}
        {isDesktop && isLeaving && (
          <motion.div
            key="shine-reverse"
            className="absolute top-1/2 w-[5.96px] h-[118px] pointer-events-none"
            style={{
              transform: 'translateY(-50%) rotate(19.03deg)',
              zIndex: 2,
              background: buttonColors.shine,
              filter: 'blur(7.5px)',
              borderRadius: '0px',
            }}
            variants={shineReverseVariants}
            initial="initial"
            animate="animate"
          />
        )}

        {/* Left arrow - Desktop: always shown (animated on hover), Mobile: shown only if showArrowMobile=true */}
        {showArrow && arrowPosition === 'left' && (
          <>
            {/* Desktop version - animated, always visible */}
            <motion.div
              className="overflow-hidden hidden md:block"
              initial={{ width: 0, opacity: 0 }}
              animate={
                isDesktop && isHovering ? { width: '20px', opacity: 1 } : { width: 0, opacity: 0 }
              }
              transition={{
                width: { duration: 0.4, ease: easeInOut },
                opacity: { duration: 0.3, ease: easeInOut },
              }}
            >
              <motion.svg
                height="8"
                viewBox="197 27 25 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ x: -20 }}
                animate={isDesktop && isHovering ? { x: 0 } : { x: -20 }}
                transition={{ duration: 0.4, ease: easeInOut }}
                style={{
                  transform: 'scaleX(-1)',
                  flexShrink: 0,
                  height: '8px',
                  width: '20px',
                }}
              >
                <path
                  d="M221.354 31.8536C221.549 31.6583 221.549 31.3417 221.354 31.1464L218.172 27.9645C217.976 27.7692 217.66 27.7692 217.464 27.9645C217.269 28.1597 217.269 28.4763 217.464 28.6716L220.293 31.5L217.464 34.3284C217.269 34.5237 217.269 34.8403 217.464 35.0355C217.66 35.2308 217.976 35.2308 218.172 35.0355L221.354 31.8536ZM197 31.5V32H221V31.5V31H197V31.5Z"
                  fill="white"
                />
              </motion.svg>
            </motion.div>
            {/* Mobile version - static, only shown if showArrowMobile=true */}
            {showArrowMobile && (
              <div className="md:hidden">
                <svg
                  height="8"
                  viewBox="197 27 25 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: 'scaleX(-1)',
                    flexShrink: 0,
                    height: '8px',
                    width: '20px',
                  }}
                >
                  <path
                    d="M221.354 31.8536C221.549 31.6583 221.549 31.3417 221.354 31.1464L218.172 27.9645C217.976 27.7692 217.66 27.7692 217.464 27.9645C217.269 28.1597 217.269 28.4763 217.464 28.6716L220.293 31.5L217.464 34.3284C217.269 34.5237 217.269 34.8403 217.464 35.0355C217.66 35.2308 217.976 35.2308 218.172 35.0355L221.354 31.8536ZM197 31.5V32H221V31.5V31H197V31.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </>
        )}

        {/* Button content */}
        <span className="relative z-0 whitespace-nowrap text-white font-karla font-bold text-[0.875rem] leading-[140%] tracking-[-0.03em] me-[7px] md:me-0">
          {children}
        </span>

        {/* Right arrow - Desktop: always shown (animated on hover), Mobile: shown only if showArrowMobile=true */}
        {showArrow && arrowPosition === 'right' && (
          <>
            {/* Desktop version - animated, always visible */}
            <motion.div
              className="overflow-hidden hidden md:block"
              initial={{ width: 0, opacity: 0 }}
              animate={
                isDesktop && isHovering ? { width: '20px', opacity: 1 } : { width: 0, opacity: 0 }
              }
              transition={{
                width: { duration: 0.4, ease: easeInOut },
                opacity: { duration: 0.3, ease: easeInOut },
              }}
            >
              <motion.svg
                height="8"
                viewBox="197 27 25 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ x: 20 }}
                animate={isDesktop && isHovering ? { x: 0 } : { x: 20 }}
                transition={{ duration: 0.4, ease: easeInOut }}
                style={{
                  flexShrink: 0,
                  height: '8px',
                  width: '20px',
                }}
              >
                <path
                  d="M221.354 31.8536C221.549 31.6583 221.549 31.3417 221.354 31.1464L218.172 27.9645C217.976 27.7692 217.66 27.7692 217.464 27.9645C217.269 28.1597 217.269 28.4763 217.464 28.6716L220.293 31.5L217.464 34.3284C217.269 34.5237 217.269 34.8403 217.464 35.0355C217.66 35.2308 217.976 35.2308 218.172 35.0355L221.354 31.8536ZM197 31.5V32H221V31.5V31H197V31.5Z"
                  fill="white"
                />
              </motion.svg>
            </motion.div>
            {/* Mobile version - static, only shown if showArrowMobile=true */}
            {showArrowMobile && (
              <div className="md:hidden">
                <svg
                  height="8"
                  viewBox="197 27 25 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    flexShrink: 0,
                    height: '8px',
                    width: '20px',
                  }}
                >
                  <path
                    d="M221.354 31.8536C221.549 31.6583 221.549 31.3417 221.354 31.1464L218.172 27.9645C217.976 27.7692 217.66 27.7692 217.464 27.9645C217.269 28.1597 217.269 28.4763 217.464 28.6716L220.293 31.5L217.464 34.3284C217.269 34.5237 217.269 34.8403 217.464 35.0355C217.66 35.2308 217.976 35.2308 218.172 35.0355L221.354 31.8536ZM197 31.5V32H221V31.5V31H197V31.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </>
        )}
      </motion.button>
    )
  },
)

PrimaryButton.displayName = 'PrimaryButton'

export { PrimaryButton }
