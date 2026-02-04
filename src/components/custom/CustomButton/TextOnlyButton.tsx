'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'
import { BaseButtonProps } from './types'

export interface TextOnlyButtonProps extends BaseButtonProps {}

const TextOnlyButton = React.forwardRef<HTMLButtonElement, TextOnlyButtonProps>(
  ({ className, children, showArrow = true, arrowPosition = 'right', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group inline-flex gap-7 px-6 py-3 items-center rounded-none bg-white/0 text-secondary font-karla font-bold text-[15px] leading-[140%] tracking-[-3%] transition-all duration-300',
          className,
        )}
        {...props}
      >
        {showArrow && arrowPosition === 'left' && (
          <Image src="/arrow-black.svg" width={20} height={8} alt="Arrow left" />
        )}
        <span>{children}</span>
        {showArrow && arrowPosition === 'right' && (
          <Image src="/arrow-black.svg" width={20} height={8} alt="Arrow right" />
        )}
      </button>
    )
  },
)

TextOnlyButton.displayName = 'TextOnlyButton'

export default TextOnlyButton
