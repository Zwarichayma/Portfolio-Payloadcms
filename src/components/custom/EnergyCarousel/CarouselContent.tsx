'use client'
import CheckItem from '@/components/custom/CheckItem'
import { CustomButton } from '@/components/custom/CustomButton/CustomButton'
import { CustomTitle } from '@/components/custom/CustomTitle'

interface TabItem {
  title: string
  description: string
}

interface CarouselContentProps {
  title: string
  subtitle?: string
  items: TabItem[]
  buttonText: string
}

export function CarouselContent({ title, items, buttonText }: CarouselContentProps) {
  return (
    <div className="flex flex-col h-full">
      {title && (
        <div>
          <CustomTitle
            variant="h5"
            color="secondary"
            fontWeight={600}
            textAlign="left"
            maxWidth={'450'}
            className="mb-48"
          >
            {title}
          </CustomTitle>
        </div>
      )}
      <div className="space-y-32 flex-grow">
        {items.map((item, index) => (
          <CheckItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-48 w-fit">
        <CustomButton variant="primary">{buttonText}</CustomButton>
      </div>
    </div>
  )
}
