import { defineField, defineType } from 'sanity'

export const valueProposition = defineType({
  name: 'valueProposition',
  title: 'Why Choose Us Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text that appears above the headline (e.g., "Why Choose Us")',
      initialValue: 'Why Choose Us',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      description: 'Main headline for the why choose us section',
      validation: (Rule) => Rule.required().max(150).warning('Keep it under 150 characters for better readability'),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text in Headline',
      type: 'string',
      description: 'Part of the headline to highlight in primary color (optional)',
      validation: (Rule) => Rule.max(50),
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
      description: 'Rich text description for the why choose us section (supports multiple paragraphs)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main image for the why choose us section',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Value Proposition Cards',
      type: 'array',
      description: 'Value proposition cards to display (1-8 items recommended)',
      of: [
        defineField({
          type: 'object',
          name: 'value',
          title: 'Value',
          fields: [
            defineField({
              name: 'title',
              title: 'Value Title',
              type: 'string',
              description: 'Value title (e.g., "Safety First")',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'description',
              title: 'Value Description',
              type: 'text',
              description: 'Brief description of this value proposition',
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: 'icon',
              title: 'Value Icon',
              type: 'string',
              description: 'Select an icon for this value',
              options: {
                list: [
                  { title: 'Shield (Safety/Security)', value: 'shield' },
                  { title: 'Clock (Time/Delivery)', value: 'clock' },
                  { title: 'Lightbulb (Innovation/Ideas)', value: 'lightbulb' },
                  { title: 'Heart Handshake (Partnership)', value: 'heart-handshake' },
                  { title: 'Check Circle (Quality/Success)', value: 'check-circle' },
                  { title: 'Award (Excellence/Achievement)', value: 'award' },
                  { title: 'Users (Team/People)', value: 'users' },
                  { title: 'Zap (Speed/Energy)', value: 'zap' },
                  { title: 'Target (Precision/Goals)', value: 'target' },
                  { title: 'Briefcase (Professional/Business)', value: 'briefcase' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
              initialValue: 'shield',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this value appears (1-8)',
              validation: (Rule) => Rule.required().min(1).max(10),
              initialValue: 1,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
              order: 'order',
            },
            prepare({ title, subtitle, icon, order }) {
              // Use simple text instead of emojis to avoid encoding issues
              const iconLabels: Record<string, string> = {
                shield: 'Shield',
                clock: 'Clock',
                lightbulb: 'Lightbulb',
                'heart-handshake': 'HeartHandshake',
                'check-circle': 'CheckCircle',
                award: 'Award',
                users: 'Users',
                zap: 'Zap',
                target: 'Target',
                briefcase: 'Briefcase',
              }
              
              const displayTitle = title || 'Value'
              const displayOrder = order || 1
              const displaySubtitle = subtitle ? 
                (subtitle.length > 60 ? subtitle.substring(0, 60) + '...' : subtitle) : 
                'No description'
              const displayIcon = iconLabels[icon as string] || 'Value'
              
              return {
                title: `${displayOrder}. ${displayTitle}`,
                subtitle: displaySubtitle,
                media: displayIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(8).warning('Consider keeping values to 8 or fewer for better visual balance'),
    }),
    defineField({
      name: 'successMetric',
      title: 'Success Metric Card',
      type: 'object',
      description: 'Floating success metric card (optional)',
      fields: [
        defineField({
          name: 'value',
          title: 'Metric Value',
          type: 'string',
          description: 'The metric value (e.g., "100%", "15+", "200+")',
          validation: (Rule) => Rule.max(20),
        }),
        defineField({
          name: 'label',
          title: 'Metric Label',
          type: 'string',
          description: 'Label for the metric (e.g., "Project Success Rate")',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'icon',
          title: 'Metric Icon',
          type: 'string',
          description: 'Icon for the success metric',
          options: {
            list: [
              { title: 'Check Circle (Success/Quality)', value: 'check-circle' },
              { title: 'Award (Achievement)', value: 'award' },
              { title: 'Target (Goals/Accuracy)', value: 'target' },
              { title: 'Trending Up (Growth)', value: 'trending-up' },
              { title: 'Shield (Reliability)', value: 'shield' },
            ],
            layout: 'dropdown',
          },
          initialValue: 'check-circle',
        }),
        defineField({
          name: 'show',
          title: 'Show Success Card',
          type: 'boolean',
          description: 'Toggle to show/hide the floating success metric card',
          initialValue: true,
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
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
      subtitle: 'badgeText',
      valuesCount: 'values',
      media: 'heroImage',
    },
    prepare({ title, subtitle, valuesCount, media }) {
      const count = Array.isArray(valuesCount) ? valuesCount.length : 0
      const displayTitle = title || 'Why Choose Us Section'
      const displaySubtitle = subtitle || 'Why Choose Us'
      
      return {
        title: displayTitle,
        subtitle: `${displaySubtitle} - ${count} values`,
        media: media,
      }
    },
  },
})