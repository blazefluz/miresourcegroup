import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text that appears above the headline (e.g., "About Us")',
      initialValue: 'About Us',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      description: 'Main headline for the about section',
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
      description: 'Rich text description for the about section (supports multiple paragraphs)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-Action Text',
      type: 'string',
      description: 'Text for the call-to-action link (optional)',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Call-to-Action URL',
      type: 'string',
      description: 'URL for the call-to-action link (can be relative like #contact)',
    }),
    defineField({
      name: 'features',
      title: 'Feature Cards',
      type: 'array',
      description: 'Feature cards to display (1-6 items recommended)',
      of: [
        defineField({
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Feature title (e.g., "Our Mission")',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Feature description (plain text)',
              validation: (Rule) => Rule.required().max(300),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Select an icon for this feature',
              options: {
                list: [
                  { title: 'Target (Mission/Goals)', value: 'target' },
                  { title: 'Award (Achievement/Vision)', value: 'award' },
                  { title: 'Users (Team/People)', value: 'users' },
                  { title: 'Zap (Speed/Innovation)', value: 'zap' },
                  { title: 'Briefcase (Business/Work)', value: 'briefcase' },
                  { title: 'Settings (Process/System)', value: 'settings' },
                  { title: 'Shield (Security/Protection)', value: 'shield' },
                  { title: 'Trending Up (Growth/Progress)', value: 'trending-up' },
                  { title: 'Heart (Care/Values)', value: 'heart' },
                  { title: 'Globe (Global/Reach)', value: 'globe' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
              initialValue: 'target',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this feature appears (1-6)',
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
                target: 'Target',
                award: 'Award',
                users: 'Users',
                zap: 'Zap',
                briefcase: 'Briefcase',
                settings: 'Settings',
                shield: 'Shield',
                'trending-up': 'TrendingUp',
                heart: 'Heart',
                globe: 'Globe',
              }
              
              const displayTitle = title || 'Feature'
              const displayOrder = order || 1
              const displaySubtitle = subtitle ? 
                (subtitle.length > 60 ? subtitle.substring(0, 60) + '...' : subtitle) : 
                'No description'
              const displayIcon = iconLabels[icon as string] || 'Feature'
              
              return {
                title: `${displayOrder}. ${displayTitle}`,
                subtitle: displaySubtitle,
                media: displayIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6).warning('Consider keeping features to 6 or fewer for better visual balance'),
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
      featuresCount: 'features',
    },
    prepare({ title, subtitle, featuresCount }) {
      const count = Array.isArray(featuresCount) ? featuresCount.length : 0
      const displayTitle = title || 'About Section'
      const displaySubtitle = subtitle || 'About Us'
      
      return {
        title: displayTitle,
        subtitle: `${displaySubtitle} - ${count} features`,
        media: 'About',
      }
    },
  },
})