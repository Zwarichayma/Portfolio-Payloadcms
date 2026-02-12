'use client'

import { motion, Variants } from 'motion/react'
import Image from 'next/image'
import React from 'react'
import CustomText from './custom-text'

type Item = {
  title: string
  description: string
}

type Props = {
  item: Item
  index?: number
}

const CheckItem: React.FC<Props> = ({ item }) => {
  // local animation variants used by the item
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  }
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        x: 5,
        transition: { duration: 0.3, ease: 'easeInOut' },
      }}
    >
      <div className="flex gap-7">
        <motion.div
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          <Image
            src="/carousel/check.svg"
            alt="Check"
            width={17}
            height={17}
            className="w-auto h-auto"
          />
        </motion.div>
        <CustomText
          variant="body"
          font="karla"
          fontWeight="bold"
          tracking="reduced"
          color="secondary"
        >
          {item.title}
        </CustomText>
      </div>
      <div className="flex-1">
        <CustomText
          variant="body"
          font="karla"
          tracking="reduced"
          color="custom"
          customColor="var(--gray-400)"
          className="whitespace-pre-wrap"
        >
          {item.description}
        </CustomText>
      </div>
    </motion.div>
  )
}

export default CheckItem
