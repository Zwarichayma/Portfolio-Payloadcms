import React from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'motion/react'
import CustomText from '@/components/custom/custom-text'
import Image from 'next/image'
import { BenefitCardProps } from './types'

export function BenefitCard({ text, position }: BenefitCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top: position.top,
        left: `calc(${position.left} - 126.5px)`,
        minHeight: '76px',
        zIndex: 10,
        transform: 'translateX(-50%)',
        minWidth: '16rem',
      }}
    >
      <Card
        className="h-auto border-none px-24 py-16"
        style={{
          boxShadow:
            '139px 85px 46px 0 rgba(0, 0, 0, 0.00), 89px 55px 42px 0 rgba(0, 0, 0, 0.01), 50px 31px 35px 0 rgba(0, 0, 0, 0.05), 22px 14px 26px 0 rgba(0, 0, 0, 0.09), 6px 3px 14px 0 rgba(0, 0, 0, 0.10)',
          background: 'var(--white)',
        }}
      >
        <div className="flex flex-row items-center gap-7">
          <Image
            src="/carousel/check.svg"
            alt="Check"
            width={31}
            height={31}
            className="w-[31px] h-[31px] object-center"
          />
          <CustomText
            variant="body"
            font="karla"
            fontWeight="medium"
            tracking="card"
            color="custom"
            customColor="var(--black)"
            className="max-w-[215px]"
          >
            {text}
          </CustomText>
        </div>
      </Card>
    </motion.div>
  )
}
