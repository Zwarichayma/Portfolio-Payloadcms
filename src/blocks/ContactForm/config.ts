import { anchorIdField } from '@/fields/anchorIdField'

import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  fields: [
    anchorIdField('contactForm'),
    {
      name: 'codeLabel',
      type: 'text',
      label: 'Code Label',
      defaultValue: '// 07 — contact',
      admin: {
        description: 'Badge mono affiché au-dessus du titre (ex: // 07 — contact)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Get In Touch',
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
      name: 'successMessage',
      type: 'text',
      label: 'Success Message',
      defaultValue: 'Thank you! Your message has been sent successfully.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Send Message',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Téléphone',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Liens sociaux',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Libellé',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
      maxRows: 6,
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
