// Types pour les composants CustomButton

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showArrow?: boolean
  arrowPosition?: 'left' | 'right'
  animated?: boolean
  animationStyle?: 'shine' | 'expand' | 'none'
  children: React.ReactNode
  className?: string
}

export type PrimaryButtonProps = BaseButtonProps

export type SecondaryButtonProps = BaseButtonProps

export type OutlineButtonProps = BaseButtonProps

export type OutlineAnimatedButtonProps = BaseButtonProps

export type TextOnlyButtonProps = BaseButtonProps

export type SecondaryFilledButtonProps = BaseButtonProps
