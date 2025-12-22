import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text (from headline)',
      type: 'string',
      description: 'Text from the headline that should be highlighted in primary color',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Map Pin', value: 'map-pin' },
                  { title: 'Phone', value: 'phone' },
                  { title: 'Mail', value: 'mail' },
                  { title: 'Globe', value: 'globe' },
                  { title: 'Clock', value: 'clock' },
                ],
              },
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
              title: 'label',
              subtitle: 'value',
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
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'formSettings',
      title: 'Form Settings',
      type: 'object',
      fields: [
        {
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Success Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Success Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'badgeText',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Section',
        subtitle: subtitle,
      }
    },
  },
})