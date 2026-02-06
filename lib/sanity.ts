import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  source: any,
  width?: number,
  height?: number,
  quality = 80
) {
  let imageBuilder = urlFor(source).quality(quality).format('webp')
  
  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }
  
  return imageBuilder.url()
}

// Client for fetching data in Server Components
export const client = createClient({
  ...config,
  useCdn: false, // Set to false to ensure fresh data during development
})

// Client for fetching data in draft mode
export const draftClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
})

// Helper function to choose the right client based on draft mode
export function getClient(preview?: boolean) {
  return preview ? draftClient : client
}