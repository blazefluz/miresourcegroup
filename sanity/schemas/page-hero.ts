import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageHero',
  title: 'Page Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
      description: 'Unique identifier for the page (e.g., "about", "services")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Opacity of the dark overlay (0-1)',
      validation: (Rule) => Rule.min(0).max(1),
      initialValue: 0.7,
    }),
  ],
  preview: {
    select: {
      title: 'pageName',
      subtitle: 'title',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${title} Page Hero`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
