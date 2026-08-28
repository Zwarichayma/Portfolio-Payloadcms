import type { Block } from 'payload'

export const Projects: Block = {
  slug: 'projects',
  interfaceName: 'ProjectsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'My Projects',
    },
    {
      name: 'codeLabel',
      type: 'text',
      label: 'Code Label',
      admin: {
        description: 'Badge mono affiché au-dessus du titre (ex: // 03 — projets)',
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
      name: 'projects',
      type: 'array',
      label: 'Projects',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Project Title',
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Slug',
          admin: {
            description: 'URL-friendly identifier (auto-generated from title if empty)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'longDescription',
          type: 'richText',
          label: 'Long Description',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail Image',
        },
        {
          name: 'images',
          type: 'array',
          label: 'Gallery Images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Alt Text',
            },
          ],
          maxRows: 10,
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
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Technology Icon',
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
                { label: 'Yellow', value: 'yellow' },
              ],
              defaultValue: 'blue',
            },
          ],
        },
        {
          name: 'links',
          type: 'group',
          label: 'Project Links',
          fields: [
            {
              name: 'liveUrl',
              type: 'text',
              label: 'Live Demo URL',
            },
            {
              name: 'githubUrl',
              type: 'text',
              label: 'GitHub Repository URL',
            },
            {
              name: 'caseStudyUrl',
              type: 'text',
              label: 'Case Study URL',
            },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Project',
          defaultValue: false,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          options: [
            { label: 'Web App', value: 'webapp' },
            { label: 'Mobile App', value: 'mobile' },
            { label: 'API', value: 'api' },
            { label: 'CLI Tool', value: 'cli' },
            { label: 'Library', value: 'library' },
            { label: 'Design System', value: 'design-system' },
            { label: 'Open Source', value: 'open-source' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'webapp',
        },
        {
          name: 'startDate',
          type: 'date',
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
          name: 'status',
          type: 'select',
          label: 'Status',
          options: [
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'Maintained', value: 'maintained' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'completed',
        },
      ],
    },
    {
      name: 'displayStyle',
      type: 'select',
      label: 'Display Style',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      label: 'Show Category Filters',
      defaultValue: true,
    },
    {
      name: 'itemsPerRow',
      type: 'select',
      label: 'Items Per Row',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
      defaultValue: '3',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.displayStyle === 'grid' || siblingData?.displayStyle === 'masonry',
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
        { label: 'Stagger', value: 'stagger' },
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
