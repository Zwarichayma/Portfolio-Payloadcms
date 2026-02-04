import { cn } from '@/utilities/ui'
import React from 'react'

interface TitleProps {
  children: React.ReactNode
  variant?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
  color?: 'primary' | 'secondary' | 'tertiary' | 'white' | 'black' | 'gray-100' | 'gray-500'
  maxWidth?: string // exemple: "550"
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  fontWeight?: 400 | 500 | 600 | 700
  className?: string
}

export const CustomTitle: React.FC<TitleProps> = ({
  children,
  variant = 'div',
  color = 'secondary',
  maxWidth,
  textAlign,
  fontWeight,
  className,
}) => {
  const variants = {
    div: 'font-bricolage text-[17px] leading-[110%] tracking-[-3%]',
    h1: 'font-bricolage text-[70px] leading-[110%] tracking-[-3%]',
    h2: 'font-bricolage text-[35px] md:text-[60px] leading-[110%] tracking-[-3%]',// Modified
    h3: 'font-bricolage text-[24px]  leading-[120%] md:text-[40px] md:leading-[110%] tracking-[-3%]',// Modified
    h4: 'font-bricolage text-[30px] leading-[110%] tracking-[-3%]',
    h5: 'font-bricolage text-[20px] md:text-[26px] leading-[110%] tracking-[-3%]',// Modified
    h6: 'font-bricolage text-[20px] leading-[100%] tracking-[-3%]',
    span: 'font-bricolage text-[17px] leading-[110%] tracking-[-3%]',
    p: 'font-bricolage text-[18px] leading-[140%] tracking-[-3%]', // Added new size for paragraph
  }

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  const fontWeightClasses = {
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
  }
  const baseStyles = variants[variant] || variants.div

  const isValidHtmlTag = /^(h[1-6]|p|span|div)$/.test(variant)
  const Tag = isValidHtmlTag ? variant : 'div'

  return (
    <Tag
      className={cn(
        baseStyles,
        `text-${color}`,
        maxWidth && `max-w-[${maxWidth}px]`,
        textAlign && textAlignClasses[textAlign],
        fontWeight && fontWeightClasses[fontWeight],
        className,
      )}
      style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
    >
      {children}
    </Tag>
  )
}
