import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContactFormBlock } from '@/blocks/ContactForm/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { DeveloperPortfolioBlock } from '@/blocks/DeveloperPortfolio/Component'
import { ExperienceBlock } from '@/blocks/Experience/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { FormationBlock } from '@/blocks/Formation/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeaderBlock } from './HeaderBlock/Component'
import { ProjectsBlock } from '@/blocks/Projects/Component'
import { SkillsBlock } from './Skills/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'

const blockComponents = {
  archive: ArchiveBlock,
  contactForm: ContactFormBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  developerPortfolio: DeveloperPortfolioBlock,
  experience: ExperienceBlock,
  formation: FormationBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  headerBlock: HeaderBlock,
  projects: ProjectsBlock,
  skills: SkillsBlock,
  stats: StatsBlock,
  testimonials: TestimonialsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div  key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
