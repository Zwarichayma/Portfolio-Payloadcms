import React from 'react'
import CustomText from '@/components/custom/custom-text'
import { CustomButton } from '@/components/custom/CustomButton/CustomButton'
import { Presentation, ProfileItemProps } from './types'

export function ProfileItem({ presentation, isActive, onClick }: ProfileItemProps) {
  if (isActive) {
    return (
      <div className="bg-gray-100 p-24 border-b border-gray-200 flex flex-col gap-32">
        <CustomText
          variant="medium"
          font="karla"
          fontWeight="bold"
          tracking="profile"
          color="custom"
          customColor="var(--secondary)"
        >
          {presentation.title}
        </CustomText>
        <CustomText
          variant="medium"
          font="karla"
          fontWeight="normal"
          tracking="profile"
          color="custom"
          customColor="var(--secondary)"
        >
          {presentation.description}
        </CustomText>
        <div className="flex justify-start">
          <CustomButton
            variant="outline"
            showArrow={true}
            arrowPosition="right"
            animationStyle="expand"
          >
            Voir l&apos;étude de cas
          </CustomButton>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className="px-24 py-16 text-left border-b border-gray-200 transition-all duration-200 bg-white hover:bg-white flex justify-between items-center w-full group"
    >
      <CustomText
        variant="medium"
        font="karla"
        fontWeight="normal"
        tracking="profile"
        color="custom"
        customColor="var(--secondary)"
      >
        {presentation.title}
      </CustomText>

      <img
        src="/arrow-black.svg"
        width={24}
        height={8}
        alt="Arrow left"
        className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </button>
  )
}
