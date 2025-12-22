import { defineField, defineType } from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text that appears above the headline (e.g., "Our Services")',
      initialValue: 'Our Services',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      description: 'Main headline for the services section',
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
      description: 'Rich text description for the services section (supports multiple paragraphs)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Service Cards',
      type: 'array',
      description: 'Service cards to display (1-6 items recommended)',
      of: [
        defineField({
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
              description: 'Service name (e.g., "Engineering & Procurement")',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'text',
              description: 'Detailed description of the service',
              validation: (Rule) => Rule.required().max(500),
            }),
            defineField({
              name: 'icon',
              title: 'Service Icon',
              type: 'string',
              description: 'Select an icon for this service',
              options: {
                list: [
                  { title: 'Wrench (Engineering/Technical)', value: 'wrench' },
                  { title: 'Truck (Logistics/Supply Chain)', value: 'truck' },
                  { title: 'Briefcase (Management/Business)', value: 'briefcase' },
                  { title: 'Settings (Operations/Systems)', value: 'settings' },
                  { title: 'Shield (Security/Protection)', value: 'shield' },
                  { title: 'Zap (Energy/Power)', value: 'zap' },
                  { title: 'Globe (Global/Network)', value: 'globe' },
                  { title: 'Users (Team/People)', value: 'users' },
                  { title: 'Target (Goals/Strategy)', value: 'target' },
                  { title: 'Award (Quality/Excellence)', value: 'award' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
              initialValue: 'wrench',
            }),
            defineField({
              name: 'features',
              title: 'Service Features',
              type: 'array',
              description: 'List of key features or capabilities for this service',
              of: [
                {
                  type: 'string',
                  validation: (Rule) => Rule.max(100),
                }
              ],
              validation: (Rule) => Rule.min(2).max(8).warning('Consider 2-6 features for optimal display'),
            }),
            defineField({
              name: 'ctaText',
              title: 'Call-to-Action Text',
              type: 'string',
              description: 'Text for the service link (e.g., "Learn More")',
              initialValue: 'Learn More',
              validation: (Rule) => Rule.max(30),
            }),
            defineField({
              name: 'ctaUrl',
              title: 'Call-to-Action URL',
              type: 'string',
              description: 'URL for the service link (can be relative like #contact)',
              initialValue: '#contact',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this service appears (1-6)',
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
              featuresCount: 'features',
            },
            prepare({ title, subtitle, icon, order, featuresCount }) {
              // Use simple text instead of emojis to avoid encoding issues
              const iconLabels: Record<string, string> = {
                wrench: 'Wrench',
                truck: 'Truck',
                briefcase: 'Briefcase',
                settings: 'Settings',
                shield: 'Shield',
                zap: 'Zap',
                globe: 'Globe',
                users: 'Users',
                target: 'Target',
                award: 'Award',
              }
              
              const displayTitle = title || 'Service'
              const displayOrder = order || 1
              const displaySubtitle = subtitle ? 
                (subtitle.length > 60 ? subtitle.substring(0, 60) + '...' : subtitle) : 
                'No description'
              const displayIcon = iconLabels[icon as string] || 'Service'
              const featureCount = Array.isArray(featuresCount) ? featuresCount.length : 0
              
              return {
                title: `${displayOrder}. ${displayTitle}`,
                subtitle: `${displaySubtitle} (${featureCount} features)`,
                media: displayIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6).warning('Consider keeping services to 6 or fewer for better visual balance'),
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
      servicesCount: 'services',
    },
    prepare({ title, subtitle, servicesCount }) {
      const count = Array.isArray(servicesCount) ? servicesCount.length : 0
      const displayTitle = title || 'Services Section'
      const displaySubtitle = subtitle || 'Our Services'
      
      return {
        title: displayTitle,
        subtitle: `${displaySubtitle} - ${count} services`,
        media: 'Services',
      }
    },
  },
})