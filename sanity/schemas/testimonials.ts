import { defineField, defineType } from 'sanity'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text that appears above the headline (e.g., "Testimonials")',
      initialValue: 'Testimonials',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      description: 'Main headline for the testimonials section',
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
      name: 'testimonials',
      title: 'Client Testimonials',
      type: 'array',
      description: 'Client testimonials to display (1-10 items recommended)',
      of: [
        defineField({
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
              description: 'The testimonial content/quote from the client',
              validation: (Rule) => Rule.required().max(500).warning('Keep quotes under 500 characters for better readability'),
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              description: 'Full name of the person giving the testimonial',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'role',
              title: 'Job Title/Role',
              type: 'string',
              description: 'Job title or position of the author',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'company',
              title: 'Company Name',
              type: 'string',
              description: 'Company or organization name',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'avatar',
              title: 'Profile Photo',
              type: 'image',
              description: 'Optional profile photo of the testimonial author',
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
              name: 'featured',
              title: 'Featured Testimonial',
              type: 'boolean',
              description: 'Mark this testimonial as featured (appears first)',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this testimonial appears (1-10)',
              validation: (Rule) => Rule.required().min(1).max(20),
              initialValue: 1,
            }),
          ],
          preview: {
            select: {
              quote: 'quote',
              author: 'author',
              company: 'company',
              order: 'order',
              featured: 'featured',
              avatar: 'avatar',
            },
            prepare({ quote, author, company, order, featured, avatar }) {
              const displayAuthor = author || 'Anonymous'
              const displayCompany = company || 'Unknown Company'
              const displayOrder = order || 1
              const displayQuote = quote ? 
                (quote.length > 80 ? quote.substring(0, 80) + '...' : quote) : 
                'No quote provided'
              const featuredLabel = featured ? ' ⭐' : ''
              
              return {
                title: `${displayOrder}. ${displayAuthor}${featuredLabel}`,
                subtitle: `"${displayQuote}" - ${displayCompany}`,
                media: avatar,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(10).warning('Consider keeping testimonials to 10 or fewer for better performance'),
    }),
    defineField({
      name: 'carouselSettings',
      title: 'Carousel Settings',
      type: 'object',
      description: 'Configure carousel behavior and appearance',
      fields: [
        defineField({
          name: 'autoPlay',
          title: 'Auto-Play Carousel',
          type: 'boolean',
          description: 'Automatically rotate through testimonials',
          initialValue: false,
        }),
        defineField({
          name: 'autoPlayInterval',
          title: 'Auto-Play Interval (seconds)',
          type: 'number',
          description: 'Seconds between automatic transitions (only if auto-play is enabled)',
          validation: (Rule) => Rule.min(3).max(30),
          initialValue: 5,
          hidden: ({ parent }) => !parent?.autoPlay,
        }),
        defineField({
          name: 'showNavigation',
          title: 'Show Navigation Buttons',
          type: 'boolean',
          description: 'Show previous/next navigation buttons',
          initialValue: true,
        }),
        defineField({
          name: 'showDots',
          title: 'Show Dot Indicators',
          type: 'boolean',
          description: 'Show dot indicators for direct navigation',
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
      testimonialsCount: 'testimonials',
    },
    prepare({ title, subtitle, testimonialsCount }) {
      const count = Array.isArray(testimonialsCount) ? testimonialsCount.length : 0
      const displayTitle = title || 'Testimonials Section'
      const displaySubtitle = subtitle || 'Testimonials'
      
      return {
        title: displayTitle,
        subtitle: `${displaySubtitle} - ${count} testimonials`,
        media: 'Testimonials',
      }
    },
  },
})