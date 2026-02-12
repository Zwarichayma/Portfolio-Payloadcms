'use client'

import * as React from 'react'
import { BaseButtonProps } from './types'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export interface OutlineAnimatedButtonProps extends BaseButtonProps {
  showArrow?: boolean
  arrowPosition?: 'left' | 'right'
}

const OutlineAnimatedButton = React.forwardRef<HTMLButtonElement, OutlineAnimatedButtonProps>(
  ({ className, children, showArrow = true, arrowPosition = 'right', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('px-6 py-4 animated-button group min-w-[200px] max-w-[300px]', className)}
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
        <span className="border-span first-border">
          <span className="absolute left-0 top-0 w-[2px] h-full bg-accent transform origin-top scale-y-0 transition-transform duration-200 group-hover:scale-y-100 group-hover:bg-secondary"></span>
          <span className="absolute right-0 top-0 w-[2px] h-full bg-accent transform origin-top scale-y-0 transition-transform duration-200 group-hover:scale-y-100 group-hover:bg-secondary"></span>
          <span className="absolute top-0 left-0 w-full h-[2px] bg-accent transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 group-hover:bg-secondary"></span>
        </span>
        <span className="border-span last-border">
          <span className="absolute bottom-0 left-1/2 w-[80%] h-[2px] -translate-x-1/2 bg-accent transition-all duration-200 group-hover:w-full group-hover:bg-secondary"></span>
        </span>
        <span className="relative z-10">{children}</span>
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
  }
)

OutlineAnimatedButton.displayName = 'OutlineAnimatedButton'

export default OutlineAnimatedButton
