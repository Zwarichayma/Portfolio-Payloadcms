'use client'

import { cn } from '@/utilities/ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import type { JSX } from 'react/jsx-runtime'

const customTextStyles = cva('', {
  variants: {
    variant: {
      // Headers - tailles principales avec leading standardisé
      h1: 'text-[2.8125rem] leading-[110%]', // 45px
      h2: 'text-[2.5rem] leading-[110%]', // 40px
      h3: 'text-[1.875rem] leading-[110%]', // 30px
      h4: 'text-[1.625rem] leading-[110%]', // 26px
      h5: 'text-[1.25rem] leading-[110%]', // 20px
      h6: 'text-[1.125rem] leading-[120%]', // 18px
      // Titres spéciaux
      extraLarge: 'text-[4.0625rem] leading-[110%]', // 65px - titre très grand
      large70px: 'text-[4.375rem] leading-[110%]', // 70px - titre très grand
      large: 'text-[1.5rem] leading-[100%]', // 24px - titre moyen
      title: 'text-center text-[1.25rem] md:text-[1.625rem] leading-[120%]', // 20px mobile, 26px desktop - titre centré
      t1: 'text-center text-[1.063rem] leading-[110%]', // 17px - titre centré
      t2: 'text-center text-[1.25rem] leading-[100%]', // 20px - titre centré
      t3: 'text-[1.125rem] leading-[120%]', // 18px - titre centré
      t4: 'text-[1.125rem] leading-[140%]', // 18px - titre centré
      t5: 'text-[1rem] leading-[120%]', // 16px - texte moyen
      t6: 'text-center  text-[3.125rem] leading-[110%]', // 50px - texte moyen
      t7: 'text-center  text-[3.75rem] leading-[110%]', // 60px - texte moyen
      t8: 'text-[1rem] leading-[100%]', // 16px - texte moyen
      t9: 'text-[2rem] leading-[110%]', // 32px - texte moyen
      t10: 'text-[1.688rem] leading-[110%]', // 27px - texte moyen
      t11: 'text-[1rem] leading-[110%]', // 22px - texte moyen
      t12: 'text-[0.9375rem] leading-[110%]', // 14px - texte moyen

      // Corps de texte - tailles utilitaires réutilisables
      body: 'text-[0.9375rem] leading-[140%]', // 15px - texte standard
      bodyCompact: 'text-[0.9375rem] leading-[100%]', // 15px - texte serré
      bodySpaced: 'text-[0.9375rem] leading-[220%]', // 15px - texte aéré

      // Textes moyens
      medium: 'text-[1rem] leading-[140%]', // 16px - texte moyen
      mediumStrong: 'text-[1.25rem] leading-[140%]', // 20px - texte fort

      // Petits textes
      small: 'text-[0.875rem] leading-[100%]', // 14px - petit texte serré
      smallRegular: 'text-[0.875rem] leading-[140%]', // 14px - petit texte normal
      smaller: 'text-[0.8125rem] leading-[140%]', // 13px - très petit
      tiny: 'text-[0.75rem] leading-[140%]', // 12px - texte minuscule
      tinyCompact: 'text-[0.75rem] leading-[100%]', // 12px - texte minuscule serré
      extraTiny: 'text-[0.625rem] leading-[100%]', // 10px - texte très minuscule

      // Variantes spéciales avec positionnement
      quote: 'text-center text-[1.25rem] md:text-[1.5625rem] leading-[140%]', // 25px - citation centrée
    },
    tracking: {
      tight: 'tracking-[-0.12188rem]', // -0.12188rem pour extraLargeTitle
      tightest: 'tracking-[-0.08438rem]', // -0.08438rem pour h1
      tighter: 'tracking-[-0.075rem]', // -0.075rem pour h2
      close: 'tracking-[-0.05625rem]', // -0.05625rem pour h3
      snug: 'tracking-[-0.04875rem]', // -0.04875rem pour h4, title
      compact: 'tracking-[-0.04688rem]', // -0.04688rem pour italicQuote
      narrow: 'tracking-[-0.0375rem]', // -0.0375rem pour h5, strong
      slim: 'tracking-[-0.03375rem]', // -0.03375rem pour h6
      standard: 'tracking-[-0.03em]', // -0.03em pour service, section, legal, cta, selectra, sce
      reduced: 'tracking-[-0.02813rem]', // -0.02813rem pour body, spaced
      minimal: 'tracking-[-0.02625rem]', // -0.02625rem pour small
      tiny: 'tracking-[-0.02438rem]', // -0.02438rem pour smallBold
      profile: 'tracking-[-0.48px]', // -0.48px pour profileText
      card: 'tracking-[-0.45px]', // -0.45px pour cardText
      wider: 'tracking-wider', // tracking-wider pour sceText
      normal: 'tracking-normal', // tracking normal par défaut
    },

    fontWeight: {
      normal: 'font-normal', // 400
      medium: 'font-medium', // 500
      bold: 'font-bold', // 700
      //600
      semiBold: 'font-semibold', // 600
      // Rétrocompatibilité
      light: 'font-light', // 300
      regular: 'font-normal', // 400
      semibold: 'font-semibold', // 600
      extrabold: 'font-extrabold', // 800
    },
    fontStyle: {
      normal: 'not-italic',
      italic: 'italic',
    },
    color: {
      white: 'text-white',
      black: 'text-black',
      primary: 'text-[var(--primary)]',
      'primary-hover': 'text-[var(--primary-hover)]',
      'secondary-dark': 'text-[var(--secondary-dark)]',
      blue: 'text-[var(--blue)]',
      'text-dark': 'text-[var(--text-dark)]',
      'gray-50': 'text-[var(--gray-50)]',
      'gray-400': 'text-gray-400',
      'gray-100': 'text-gray-100',

      secondary: 'text-[var(--secondary)]', // Changed from text-secondary to use the CSS variable
      emeraude: 'text-emerald',
      'yellow-green': 'text-[var(--yellow-green)]',
      amber: 'text-[var(--amber)]',
      'lilac-violet': 'text-[var(--lilac-violet)]',
      custom: '', // Pour les couleurs personnalisées
    },
    font: {
      karla: 'font-karla',
      bricolage: 'font-bricolage',
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    fontFamily: {
      karla: 'font-karla',
      bricolage: 'font-bricolage',
    },
    responsive: {
      true: 'sm:text-base md:text-lg lg:text-xl',
      false: '',
    },
    textShadow: {
      none: '',
      default: '', // Will be handled via inline style
      strong: '', // Will be handled via inline style
    },
  },
  defaultVariants: {
    variant: 'body',
    tracking: 'normal',
    font: 'karla',
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: 'secondary',
    textAlign: 'left',
    responsive: false,
    textShadow: 'none',
    fontFamily: 'karla',
  },
})

interface CustomTextProps extends VariantProps<typeof customTextStyles> {
  children: React.ReactNode
  className?: string
  customColor?: string
  as?: keyof JSX.IntrinsicElements
  dangerouslySetInnerHTML?: {
    __html: string
  }
}

const CustomText = ({
  children,
  variant,
  tracking,
  font,
  fontWeight,
  fontStyle,
  color,
  textAlign,
  fontFamily,
  responsive,
  textShadow,
  customColor,
  className,
  as: Component = 'div',
  dangerouslySetInnerHTML,
  ...restProps
}: CustomTextProps) => {
  const styles = customTextStyles({
    variant,
    tracking,
    font,
    fontWeight,
    fontStyle,
    color: customColor ? 'custom' : color,
    textAlign,
    fontFamily,
    responsive,
    textShadow,
  })

  const customStyle = customColor ? { color: customColor } : {}

  return (
    <Component
      className={cn(styles, className)}
      style={customStyle}
      {...(dangerouslySetInnerHTML ? { dangerouslySetInnerHTML } : {})}
      {...restProps}
    >
      {!dangerouslySetInnerHTML && children}
    </Component>
  )
}

export default CustomText

export type CustomTextVariant = VariantProps<typeof customTextStyles>['variant']
export type CustomTextColor = VariantProps<typeof customTextStyles>['color']
