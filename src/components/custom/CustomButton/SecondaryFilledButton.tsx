'use client'
import CustomText from '@/components/custom/custom-text'
import * as React from 'react'
import { SecondaryFilledButtonProps } from './types'
import { cn } from '@/utilities/ui'

const SecondaryFilledButton = React.forwardRef<HTMLButtonElement, SecondaryFilledButtonProps>(
  (
    {
      className,
      showArrow = true,
      arrowPosition = 'right',
      animated: _animated,
      animationStyle: _animationStyle,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group w-full h-[40px] md:h-[3.1875rem] bg-[#F5F6F9] rounded flex items-center justify-center relative transition-all duration-300 gap-2',
          className,
        )}
        {...props}
      >
        {showArrow && arrowPosition === 'left' && (
          <div className="flex items-center">
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
              className="transition-all duration-300 group-hover:-translate-x-1"
            >
              <path
                d="M221.354 31.8536C221.549 31.6583 221.549 31.3417 221.354 31.1464L218.172 27.9645C217.976 27.7692 217.66 27.7692 217.464 27.9645C217.269 28.1597 217.269 28.4763 217.464 28.6716L220.293 31.5L217.464 34.3284C217.269 34.5237 217.269 34.8403 217.464 35.0355C217.66 35.2308 217.976 35.2308 218.172 35.0355L221.354 31.8536ZM197 31.5V32H221V31.5V31H197V31.5Z"
                fill="#397DFF"
              />
            </svg>
          </div>
        )}

        <CustomText
          variant="small"
          font="karla"
          fontWeight="bold"
          tracking="standard"
          color="primary"
          className="leading-[100%]"
        >
          {children}
        </CustomText>
        {showArrow && arrowPosition === 'right' && (
          <div className="flex items-center">
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
              className="transition-all duration-300 group-hover:translate-x-1"
            >
              <path
                d="M221.354 31.8536C221.549 31.6583 221.549 31.3417 221.354 31.1464L218.172 27.9645C217.976 27.7692 217.66 27.7692 217.464 27.9645C217.269 28.1597 217.269 28.4763 217.464 28.6716L220.293 31.5L217.464 34.3284C217.269 34.5237 217.269 34.8403 217.464 35.0355C217.66 35.2308 217.976 35.2308 218.172 35.0355L221.354 31.8536ZM197 31.5V32H221V31.5V31H197V31.5Z"
                fill="#397DFF"
              />
            </svg>
          </div>
        )}
      </button>
    )
  },
)

SecondaryFilledButton.displayName = 'SecondaryFilledButton'

export { SecondaryFilledButton }
