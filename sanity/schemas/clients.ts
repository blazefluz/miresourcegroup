import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clients',
  title: 'Clients Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text above the headline (optional)',
      validation: Rule => Rule.max(50)
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      description: 'Main section title',
      initialValue: 'Industry Leaders We Serve',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text in Headline',
      type: 'string',
      description: 'Part of the headline to highlight in primary color (optional)',
      validation: Rule => Rule.max(50)
    }),
    defineField({
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'logo',
              title: 'Company Logo',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              title: 'companyName',
              media: 'logo',
              order: 'order'
            },
            prepare({ title, media, order }) {
              return {
                title: `${order}. ${title}`,
                media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(3).max(12)
    }),
    defineField({
      name: 'animationSettings',
      title: 'Animation Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'scrollSpeed',
          title: 'Scroll Speed (seconds)',
          type: 'number',
          description: 'Time for one complete scroll cycle',
          initialValue: 35,
          validation: Rule => Rule.min(20).max(60)
        }),
        defineField({
          name: 'pauseOnHover',
          title: 'Pause Animation on Hover',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'headline',
      clientCount: 'clientLogos'
    },
    prepare({ title, clientCount }) {
      const count = clientCount ? clientCount.length : 0
      return {
        title: title || 'Clients Section',
        subtitle: `${count} client${count !== 1 ? 's' : ''}`
      }
    }
  }
})