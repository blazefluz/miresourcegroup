import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline text for the hero section',
      validation: (Rule) => Rule.required().max(100).warning('Keep it under 100 characters for better readability'),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      description: 'Optional subheadline text (appears above the main headline)',
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Rich text description for the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary Call-to-Action',
      type: 'object',
      description: 'Main action button (usually more prominent)',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required().max(30),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Can be a relative path (e.g., #services) or full URL',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
      preview: {
        select: {
          title: 'text',
          subtitle: 'url',
        },
      },
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary Call-to-Action',
      type: 'object',
      description: 'Optional secondary action button',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.max(30),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Can be a relative path (e.g., #about) or full URL',
        },
      ],
      preview: {
        select: {
          title: 'text',
          subtitle: 'url',
        },
      },
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Hero section background image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'Company statistics to display (max 6 items)',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Statistic',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "15+", "200+", "100%"',
              validation: (Rule) => Rule.required().max(10),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Years Experience", "Projects Completed"',
              validation: (Rule) => Rule.required().max(50),
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this stat appears (1-6)',
              validation: (Rule) => Rule.required().min(1).max(10),
              initialValue: 1,
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
      validation: (Rule) => Rule.max(6).warning('Consider keeping stats to 6 or fewer for better visual balance'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings',
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Title for search engines (if different from headline)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          description: 'Description for search engines',
          validation: (Rule) => Rule.max(160),
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'No subheadline',
        media: media || '🏠',
      }
    },
  },
})