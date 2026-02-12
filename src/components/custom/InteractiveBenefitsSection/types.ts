// Types pour le composant InteractiveBenefitsSection

export interface Presentation {
  image: any // Media type
  title: string
  description: string
  quote: string
  benefits: {
    text: string
  }[]
}

export interface BenefitCardProps {
  text: string
  position: {
    top: string
    left: string
  }
}

export interface BenefitCardData {
  text: string
  position: {
    top: string
    left: string
  }
}

export interface ProfileItemProps {
  presentation: Presentation
  isActive: boolean
  onClick: () => void
}

export interface ProfileListProps {
  presentations: Presentation[]
  currentPresentation: number
  onProfileClick: (index: number) => void
}

export interface HeroImageWithBenefitsProps {
  presentations: Presentation[]
  currentPresentation: number
  currentBenefits: BenefitCardData[]
}
