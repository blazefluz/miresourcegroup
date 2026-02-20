import { defineField, defineType } from 'sanity'

export const serviceDetailed = defineType({
  name: 'serviceDetailed',
  title: 'Service (Detailed)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'Service name (e.g., "Engineering Services", "Procurement Services")',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline describing the service',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the service',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'features',
      title: 'Key Features & Capabilities',
      type: 'array',
      description: 'List of key features or capabilities for this service',
      of: [
        {
          type: 'string',
          validation: (Rule) => Rule.max(200),
        }
      ],
      validation: (Rule) => Rule.min(3).max(15),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      description: 'Main image for this service',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Wrench", "Package", "Truck")',
      options: {
        list: [
          { title: 'Wrench (Engineering/Technical)', value: 'Wrench' },
          { title: 'Package (Procurement/Supply)', value: 'Package' },
          { title: 'BarChart3 (Analytics/Management)', value: 'BarChart3' },
          { title: 'Truck (Logistics/Transport)', value: 'Truck' },
          { title: 'Lightbulb (Management/Ideas)', value: 'Lightbulb' },
          { title: 'Radio (Electronics/Communication)', value: 'Radio' },
          { title: 'CheckCircle2 (Sales/Quality)', value: 'CheckCircle2' },
          { title: 'Users (Training/People)', value: 'Users' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Text Color Class',
      type: 'string',
      description: 'Tailwind text color class (e.g., "text-blue-500")',
      options: {
        list: [
          { title: 'Blue', value: 'text-blue-500' },
          { title: 'Green', value: 'text-green-500' },
          { title: 'Purple', value: 'text-purple-500' },
          { title: 'Orange', value: 'text-orange-500' },
          { title: 'Indigo', value: 'text-indigo-500' },
          { title: 'Cyan', value: 'text-cyan-600' },
          { title: 'Teal', value: 'text-teal-500' },
          { title: 'Pink', value: 'text-pink-500' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color Class',
      type: 'string',
      description: 'Tailwind background color class (e.g., "bg-blue-500")',
      options: {
        list: [
          { title: 'Blue', value: 'bg-blue-500' },
          { title: 'Green', value: 'bg-green-500' },
          { title: 'Purple', value: 'bg-purple-500' },
          { title: 'Orange', value: 'bg-orange-500' },
          { title: 'Indigo', value: 'bg-indigo-500' },
          { title: 'Cyan', value: 'bg-cyan-600' },
          { title: 'Teal', value: 'bg-teal-500' },
          { title: 'Pink', value: 'bg-pink-500' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategories',
      title: 'Service Subcategories',
      type: 'array',
      description: 'Subcategories for navigation dropdown',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Subcategory Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              initialValue: '/services',
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
              order: 'order',
            },
            prepare({ title, order }) {
              return {
                title: `${order}. ${title}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears (1-10)',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Show this service on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image',
      order: 'order',
      published: 'published',
    },
    prepare({ title, subtitle, media, order, published }) {
      return {
        title: `${order}. ${title}${published ? '' : ' (Draft)'}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
