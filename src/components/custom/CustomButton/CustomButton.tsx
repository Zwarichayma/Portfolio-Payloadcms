'use client'
import * as React from 'react'
import {
  OutlineAnimatedButton,
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
  SecondaryFilledButton,
  TextOnlyButton,
} from './'

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'outline-animated'
    | 'text-only'
    | 'secondary-filled'
  showArrow?: boolean
  showArrowMobile?: boolean // Show arrow only on mobile (desktop always shows arrow)
  arrowPosition?: 'left' | 'right'
  animated?: boolean
  animationStyle?: 'shine' | 'expand' | 'none'
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant = 'primary',
      showArrow = true, // Changé de true à false par défaut
      showArrowMobile = false, // Arrow shown on mobile when true (desktop always shows)
      arrowPosition = 'right',
      animated = true,
      animationStyle = 'shine',
      children,
      ...props
    },
    ref,
  ) => {
    const commonProps = {
      showArrow,
      showArrowMobile,
      arrowPosition,
      animated,
      animationStyle,
      children,
      className,
      ...props,
    }

    switch (variant) {
      case 'primary':
        return <PrimaryButton ref={ref} {...commonProps} />
      case 'secondary':
        return <SecondaryButton ref={ref} {...commonProps} />
      case 'outline':
        return <OutlineButton ref={ref} {...commonProps} />
      case 'outline-animated':
        return <OutlineAnimatedButton ref={ref} {...commonProps} />
      case 'text-only':
        return <TextOnlyButton ref={ref} {...commonProps} />
      case 'secondary-filled':
        return <SecondaryFilledButton ref={ref} {...commonProps} />
      default:
        return <PrimaryButton ref={ref} {...commonProps} />
    }
  },
)
CustomButton.displayName = 'CustomButton'

export { CustomButton }
