import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Text (Colored)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'secondary',
          title: 'Secondary Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
              order: 'order',
            },
            prepare({ title, subtitle, order }) {
              return {
                title: `${order}. ${title}`,
                subtitle: subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      brandPrimary: 'brandName.primary',
      brandSecondary: 'brandName.secondary',
    },
    prepare({ brandPrimary, brandSecondary }) {
      return {
        title: 'Header Configuration',
        subtitle: `${brandPrimary} ${brandSecondary}`,
      }
    },
  },
})