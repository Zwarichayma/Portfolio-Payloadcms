import type { Block } from 'payload'

export const DeveloperPortfolio: Block = {
  slug: 'developerPortfolio',
  interfaceName: 'DeveloperPortfolioBlock',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Developer Name',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Job Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'Email', value: 'email' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 5,
    },
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Animation Style',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Up', value: 'slideUp' },
        { label: 'Typewriter', value: 'typewriter' },
        { label: 'Glitch', value: 'glitch' },
      ],
      defaultValue: 'fadeIn',
    },
    {
      name: 'showParticles',
      type: 'checkbox',
      label: 'Show Particle Animation',
      defaultValue: false,
    },
  ],
}