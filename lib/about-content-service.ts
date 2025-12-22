import { getClient } from './sanity'
import { AboutContent } from '@/types/sanity'
import type { PortableTextBlock } from 'sanity'
import { draftMode } from 'next/headers'

// Placeholder content when real content is deleted (clearly marked as placeholder)
const placeholderAboutContent: AboutContent = {
  _id: 'placeholder-about',
  _type: 'about',
  _createdAt: new Date().toISOString(),
  _updatedAt: new Date().toISOString(),
  badgeText: '[PLACEHOLDER] Content Missing',
  headline: 'About Content Missing - Please Add Content',
  highlightedText: 'Missing Content',
  description: [
    {
      _type: 'block',
      _key: 'placeholder-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'placeholder-span',
          text: 'The about content has been deleted from the CMS. Please add new content in the Sanity Studio to replace this placeholder.',
          marks: ['strong'],
        },
      ],
      markDefs: [],
    },
  ] as PortableTextBlock[],
  ctaText: 'Add Content',
  ctaUrl: '/studio',
  features: [
    {
      _key: 'placeholder-feature',
      title: '⚠️ Content Missing',
      description: 'Please add about content in the Sanity Studio.',
      icon: 'settings',
      order: 1,
    },
  ],
}

// GROQ query for about content
const aboutQuery = `*[_type == "about"][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  badgeText,
  headline,
  highlightedText,
  description,
  ctaText,
  ctaUrl,
  features[] | order(order asc) {
    _key,
    title,
    description,
    icon,
    order
  },
  seo
}`

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
}

// Exponential backoff delay calculation
function calculateDelay(attempt: number): number {
  const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt)
  return Math.min(delay, RETRY_CONFIG.maxDelay)
}

// Sleep utility for delays
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Retry wrapper for API calls
async function withRetry<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === RETRY_CONFIG.maxRetries) {
        console.error(`${context} failed after ${RETRY_CONFIG.maxRetries + 1} attempts:`, lastError)
        throw lastError
      }
      
      const delay = calculateDelay(attempt)
      console.warn(`${context} attempt ${attempt + 1} failed, retrying in ${delay}ms:`, lastError.message)
      await sleep(delay)
    }
  }
  
  throw lastError
}

// Fetch about content from Sanity
export async function getAboutContent(): Promise<AboutContent> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  
  try {
    const content = await withRetry(
      () => client.fetch(aboutQuery, {}, { 
        cache: isEnabled ? 'no-store' : 'force-cache',
        next: { revalidate: isEnabled ? 0 : 60 }, // No cache in draft mode, 1 minute in production
      }),
      'About content fetch'
    )
    
    if (!content) {
      console.warn('No about content found in Sanity, using placeholder content')
      return placeholderAboutContent
    }
    
    return content
  } catch (error) {
    console.error('Failed to fetch about content from Sanity:', error)
    return placeholderAboutContent
  }
}

// Validate about content structure
export function validateAboutContent(content: any): content is AboutContent {
  return (
    content &&
    typeof content === 'object' &&
    typeof content.headline === 'string' &&
    Array.isArray(content.description)
  )
}