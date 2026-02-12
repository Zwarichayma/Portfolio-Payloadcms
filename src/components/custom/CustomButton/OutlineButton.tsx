'use client'
import Image from 'next/image'
import * as React from 'react'
import { OutlineButtonProps } from './types'
import { cn } from '@/utilities/ui'

const OutlineButton = React.forwardRef<HTMLButtonElement, OutlineButtonProps>(
  (
    {
      className,
      showArrow = true,
      arrowPosition = 'right',
      animated,
      animationStyle,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group inline-flex gap-7 px-6 py-3 items-center justify-center border-secondary !border-2 rounded-none bg-white/0 text-secondary transition-all duration-300',
          // Styles mobile par défaut
          'h-[40px] font-karla text-[14px] font-bold leading-[140%] tracking-[-0.03em]',
          // Styles desktop (md et plus)
          'md:h-[3.1875rem] md:font-[inherit] md:text-[inherit] md:leading-[inherit] md:tracking-[inherit]',
          className,
        )}
        {...props}
      >
        {showArrow && arrowPosition === 'left' && (
          <Image
            src="/arrow-black.svg"
            width={20}
            height={8}
            alt="Arrow left"
            className="rotate-180 transition-all duration-300 group-hover:mr-2"
          />
        )}
        <span>{children}</span>
        {showArrow && arrowPosition === 'right' && (
          <Image
            src="/arrow-black.svg"
            width={20}
            height={8}
            alt="Arrow right"
            className="transition-all duration-300 group-hover:ml-2"
          />
        )}
      </button>
    )
  },
)

OutlineButton.displayName = 'OutlineButton'

export { OutlineButton }
