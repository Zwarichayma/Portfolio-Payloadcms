import React from 'react'
import { ProfileItem } from './ProfileItem'
import { Presentation, ProfileListProps } from './types'

export function ProfileList({
  presentations,
  currentPresentation,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="col-span-2 flex flex-col">
      <div className="flex flex-col">
        {presentations.map((presentation, index) => (
          <ProfileItem
            key={index}
            presentation={presentation}
            isActive={index === currentPresentation}
            onClick={() => onProfileClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
