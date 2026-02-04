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
      required: true,
      label: 'Job Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Skills',
      fields: [
        {
          name: 'skill',
          type: 'text',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'Expert', value: 'expert' },
          ],
          defaultValue: 'intermediate',
        },
      ],
      minRows: 1,
      maxRows: 10,
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
          required: true,
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