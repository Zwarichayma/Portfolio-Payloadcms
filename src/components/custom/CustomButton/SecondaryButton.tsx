import * as React from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { SecondaryButtonProps } from './types'
import { cn } from '@/utilities/ui'

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  (
    {
      className,
      showArrow = true,
      arrowPosition = 'right',
      animated = true,
      animationStyle = 'shine',
      children,
      ...props
    },
    ref,
  ) => {
    const [hasBeenHovered, setHasBeenHovered] = React.useState(false)
    const [isHovering, setIsHovering] = React.useState(false)
    const [showShineReverse, setShowShineReverse] = React.useState(false)
    const [isArrowFadingOut, setIsArrowFadingOut] = React.useState(false)

    // Classes communes pour secondary avec ou sans animation
    const secondaryBaseClasses =
      'h-[3.1875rem] px-10 py-[0.9375rem] justify-center items-center text-secondary font-karla text-[0.875rem] font-bold leading-[1.225rem] tracking-[-0.02625rem] transition-all duration-200'

    const variantClasses = animated
      ? `flex ${secondaryBaseClasses} relative overflow-hidden isolation-auto gap-2.5 flex-shrink-0`
      : `flex ${secondaryBaseClasses} gap-2.5 flex-shrink-0 hover:scale-105 active:scale-95`

    // Animation duration constant for synchronization
    const ANIMATION_DURATION = 0.5

    // Variantes d'animation du bouton
    const buttonVariants: Variants = {
      initial: { scale: 1 },
      hover: {
        scale: 1,
        width: animationStyle === 'expand' ? 'calc(100% + 20px)' : undefined,
        transition: { duration: animationStyle === 'expand' ? 0.3 : ANIMATION_DURATION },
      },
      tap: { scale: 0.95 },
    }

    const shineVariants: Variants = {
      initial: { x: -70, opacity: 0 },
      animate: {
        x: 70,
        opacity: [0, 1, 0],
        transition: { duration: ANIMATION_DURATION, ease: 'easeInOut' },
      },
      reverse: {
        x: -70,
        opacity: [0, 1, 0],
        transition: { duration: ANIMATION_DURATION, ease: 'easeInOut' },
      },
    }

    const arrowVariants: Variants = {
      initial: {
        opacity: 0,
        x: arrowPosition === 'left' ? 5 : -5,
        margin: 0,
      },
      animate: {
        opacity: 1,
        x: 0,
        margin: arrowPosition === 'left' ? '0 16px 0 0' : '0 0 0 16px',
        transition: {
          duration: 0.3,
          ease: 'easeOut',
          margin: {
            duration: 0.3,
            ease: 'easeOut',
          },
        },
      },
      exit: {
        opacity: 0,
        x: arrowPosition === 'left' ? 5 : -5,
        margin: 0,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
          margin: {
            duration: 0.3,
            ease: 'easeInOut',
          },
        },
      },
    }

    // Noms des animations: "ShineArrowAnimation" et "ExpandArrowAnimation"
    const isAnimated = animated && animationStyle !== 'none'
    const isShineAnimation = animated && animationStyle === 'shine'
    const isExpandAnimation = animated && animationStyle === 'expand'

    // Séparer les props motion des props HTML pour éviter les conflits de types
    const { onAnimationStart, onDrag, onDragStart, onDragEnd, ...buttonProps } = props

    return (
      <motion.button
        className={cn(variantClasses, className)}
        ref={ref}
        variants={isAnimated ? buttonVariants : undefined}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onMouseEnter={() => {
          setIsHovering(true)
          setHasBeenHovered(true)
          setShowShineReverse(false)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
          setShowShineReverse(true)
          setIsArrowFadingOut(true)

          // Reset everything after the animation completes (500ms)
          setTimeout(() => {
            setIsArrowFadingOut(false)
            setHasBeenHovered(false)
            setShowShineReverse(false)
          }, ANIMATION_DURATION * 1000) // Convert duration to milliseconds
        }}
        {...buttonProps}
      >
        {/* Début de l'animation "ShineArrowAnimation" */}
        {isShineAnimation && (
          <AnimatePresence>
            {/* Shine effect - animate from left to right on hover */}
            {isHovering && !showShineReverse && (
              <motion.div
                key="shine-forward"
                className="absolute w-[5.96px] h-[118px] bg-gray-light blur-[7.5px] transform rotate-[45deg] z-[2]"
                variants={shineVariants}
                initial="initial"
                animate="animate"
                style={{
                  top: '-31.25px',
                  left: '0',
                  right: '0',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            )}

            {/* Shine effect - animate from right to left on unhover */}
            {showShineReverse && (
              <motion.div
                key="shine-reverse"
                className="absolute w-[5.96px] h-[118px] bg-gray-light blur-[7.5px] transform rotate-[45deg] z-[2]"
                variants={shineVariants}
                initial={{ x: 70, opacity: 0 }}
                animate="reverse"
                style={{
                  top: '-31.25px',
                  left: '0',
                  right: '0',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            )}
          </AnimatePresence>
        )}

        {/* Animation flèche gauche - apparaît uniquement au survol avec ShineArrowAnimation */}
        <AnimatePresence mode="wait">
          {showArrow && arrowPosition === 'left' && isShineAnimation && isHovering && (
            <motion.img
              key="left-arrow"
              src="/arrow-black.svg"
              width={24}
              height={8}
              alt="Arrow left"
              className="rotate-180 relative z-[0]"
              variants={arrowVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>

        {/* Animation flèche gauche - toujours visible et se déplace au survol avec ExpandArrowAnimation */}
        {showArrow && arrowPosition === 'left' && isExpandAnimation && (
          <motion.img
            src="/arrow-black.svg"
            width={24}
            height={8}
            alt="Arrow left"
            className="rotate-180 relative z-[0] mr-3"
            animate={{ x: isHovering ? -8 : 0, transition: { duration: 0.3 } }}
          />
        )}

        {/* Contenu du bouton */}
        <span className={cn(isAnimated ? 'relative z-[0]' : '')}>{children}</span>

        {/* Animation flèche droite - apparaît uniquement au survol avec ShineArrowAnimation */}
        <AnimatePresence mode="wait">
          {showArrow && arrowPosition === 'right' && isShineAnimation && isHovering && (
            <motion.img
              key="right-arrow"
              src="/arrow-black.svg"
              width={24}
              height={8}
              alt="Arrow right"
              className="relative z-[0]"
              variants={arrowVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>

        {/* Animation flèche droite - toujours visible et se déplace au survol avec ExpandArrowAnimation */}
        {showArrow && arrowPosition === 'right' && isExpandAnimation && (
          <motion.img
            src="/arrow-black.svg"
            width={24}
            height={8}
            alt="Arrow right"
            className="relative z-[0] ml-3"
            animate={{ x: isHovering ? 8 : 0, transition: { duration: 0.3 } }}
          />
        )}

        {/* Flèches pour les boutons sans animation */}
        {showArrow && arrowPosition === 'left' && !isAnimated && (
          <img
            src="/arrow-black.svg"
            width={24}
            height={8}
            alt="Arrow left"
            className="rotate-180 mr-3"
          />
        )}

        {showArrow && arrowPosition === 'right' && !isAnimated && (
          <img src="/arrow-black.svg" width={24} height={8} alt="Arrow right" className="ml-3 " />
        )}
      </motion.button>
    )
  },
)
SecondaryButton.displayName = 'SecondaryButton'

export { SecondaryButton }
