import type { Block } from 'payload'

export const Experience: Block = {
  slug: 'experience',
  interfaceName: 'ExperienceBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Experience',
    },
    {
      name: 'codeLabel',
      type: 'text',
      label: 'Code Label',
      admin: {
        description: 'Badge mono affiché au-dessus du titre (ex: // 02 — experience)',
      },
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
      name: 'experiences',
      type: 'array',
      label: 'Experiences',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Type',
          required: true,
          options: [
            { label: 'Work', value: 'work' },
            { label: 'Education', value: 'education' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Volunteer', value: 'volunteer' },
            { label: 'Certification', value: 'certification' },
          ],
          defaultValue: 'work',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title / Degree',
        },
        {
          name: 'organization',
          type: 'text',
          required: true,
          label: 'Organization / Company',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Key Highlights',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Highlight',
            },
          ],
        },
        {
          name: 'technologies',
          type: 'array',
          label: 'Technologies Used',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Technology Name',
            },
            {
              name: 'color',
              type: 'select',
              label: 'Color',
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Purple', value: 'purple' },
                { label: 'Green', value: 'green' },
                { label: 'Orange', value: 'orange' },
                { label: 'Red', value: 'red' },
                { label: 'Pink', value: 'pink' },
                { label: 'Teal', value: 'teal' },
                { label: 'Indigo', value: 'indigo' },
              ],
              defaultValue: 'blue',
            },
          ],
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
          label: 'Start Date',
          admin: {
            date: { pickerAppearance: 'monthOnly' },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
          admin: {
            date: { pickerAppearance: 'monthOnly' },
          },
        },
        {
          name: 'current',
          type: 'checkbox',
          label: 'Currently Active',
          defaultValue: false,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Organization Logo',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Organization Website URL',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Timeline Layout',
      options: [
        { label: 'Vertical Timeline', value: 'vertical' },
        { label: 'Horizontal Timeline', value: 'horizontal' },
        { label: 'Alternating Timeline', value: 'alternating' },
        { label: 'Compact', value: 'compact' },
      ],
      defaultValue: 'vertical',
    },
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Animation Style',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Up', value: 'slideUp' },
        { label: 'Reveal', value: 'reveal' },
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
