import { anchorIdField } from '@/fields/anchorIdField'

import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    anchorIdField('testimonials'),
    {
      name: 'codeLabel',
      type: 'text',
      label: 'Code Label',
      defaultValue: '// 05 — testimonials',
      admin: {
        description: 'Badge mono affiché au-dessus du titre (ex: // 05 — testimonials)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Testimonials',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Testimonial Quote',
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
          label: 'Author Name',
        },
        {
          name: 'authorTitle',
          type: 'text',
          label: 'Author Title / Role',
        },
        {
          name: 'authorOrganization',
          type: 'text',
          label: 'Organization',
        },
        {
          name: 'authorAvatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar',
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Testimonial',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'displayStyle',
      type: 'select',
      label: 'Display Style',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Single Highlight', value: 'single' },
      ],
      defaultValue: 'carousel',
    },
    {
      name: 'autoplaySpeed',
      type: 'number',
      label: 'Autoplay Speed (ms)',
      defaultValue: 5000,
      min: 2000,
      max: 15000,
      admin: {
        condition: (_, siblingData) => siblingData?.displayStyle === 'carousel',
      },
    },
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Animation Style',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Up', value: 'slideUp' },
        { label: 'Scale', value: 'scale' },
      ],
      defaultValue: 'fadeIn',
    },
    {
      name: 'showParticles',
      type: 'checkbox',
      label: 'Show Particle Animation',
      defaultValue: false,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
