// Types pour les composants CustomButton

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showArrow?: boolean
  arrowPosition?: 'left' | 'right'
  animated?: boolean
  animationStyle?: 'shine' | 'expand' | 'none'
  children: React.ReactNode
  className?: string
}

export interface PrimaryButtonProps extends BaseButtonProps {}

export interface SecondaryButtonProps extends BaseButtonProps {}

export interface OutlineButtonProps extends BaseButtonProps {}

export interface OutlineAnimatedButtonProps extends BaseButtonProps {}

export interface TextOnlyButtonProps extends BaseButtonProps {}

export interface SecondaryFilledButtonProps extends BaseButtonProps {}
