import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Get environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xh936md8'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Debug logging for environment variables
if (typeof window !== 'undefined') {
  console.log('Sanity Config Debug:', {
    projectId: projectId || 'MISSING',
    dataset: dataset || 'MISSING',
    hasProjectId: !!projectId,
    hasDataset: !!dataset,
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    }
  })
}

// Validate required environment variables
if (!projectId) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!dataset) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_DATASET environment variable')  
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

export default defineConfig({
  basePath: '/studio',
  name: 'mi-resource-group-studio',
  title: 'M.I Resources CMS',

  projectId: projectId,
  dataset: dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .icon(() => '🏠')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero-content')
                  .title('Hero Content')
              ),
            S.listItem()
              .title('About Section')
              .id('about')
              .icon(() => '📋')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about-content')
                  .title('About Content')
              ),
            S.listItem()
              .title('Services Section')
              .id('services')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('services')
                  .documentId('services-content')
                  .title('Services Content')
              ),
            S.listItem()
              .title('Why Choose Us')
              .id('value-proposition')
              .icon(() => '🎯')
              .child(
                S.document()
                  .schemaType('valueProposition')
                  .documentId('value-proposition-content')
                  .title('Why Choose Us Content')
              ),
            S.listItem()
              .title('Testimonials')
              .id('testimonials')
              .icon(() => '💬')
              .child(
                S.document()
                  .schemaType('testimonials')
                  .documentId('testimonials-content')
                  .title('Testimonials Content')
              ),
            S.listItem()
              .title('Header')
              .id('header')
              .icon(() => '🔝')
              .child(
                S.document()
                  .schemaType('header')
                  .documentId('header-content')
                  .title('Header Content')
              ),
            S.listItem()
              .title('Contact')
              .id('contact')
              .icon(() => '📞')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact-content')
                  .title('Contact Content')
              ),
            S.listItem()
              .title('Clients Section')
              .id('clients')
              .icon(() => '🏢')
              .child(
                S.document()
                  .schemaType('clients')
                  .documentId('clients-content')
                  .title('Clients Content')
              ),
            S.listItem()
              .title('Footer')
              .id('footer')
              .icon(() => '🔻')
              .child(
                S.document()
                  .schemaType('footer')
                  .documentId('footer-content')
                  .title('Footer Content')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Hide 'Settings' from new document options
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'settings')
      }
      return prev
    },
    // Removes the "duplicate" action on the "settings" singleton
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      return prev
    },
  },
})