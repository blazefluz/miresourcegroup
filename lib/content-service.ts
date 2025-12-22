import { getClient } from './sanity'
import { HeroContent } from '@/types/sanity'
import type { PortableTextBlock } from 'sanity'
import { draftMode } from 'next/headers'

// Placeholder content when real content is deleted (clearly marked as placeholder)
const placeholderHeroContent = {
  _id: 'placeholder-hero',
  _type: 'hero' as const,
  _createdAt: new Date().toISOString(),
  _updatedAt: new Date().toISOString(),
  headline: '[PLACEHOLDER] Content Missing - Please Add Hero Content',
  subheadline: 'This is placeholder content - not the actual website content',
  description: [
    {
      _type: 'block',
      _key: 'placeholder-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'placeholder-span',
          text: 'The hero content has been deleted from the CMS. Please add new content in the Sanity Studio to replace this placeholder.',
          marks: ['strong'],
        },
      ],
      markDefs: [],
    },
  ] as PortableTextBlock[],
  primaryCTA: {
    text: 'Add Content',
    url: '/studio',
  },
  secondaryCTA: {
    text: 'Contact Admin',
    url: '#contact',
  },
  stats: [
    { _key: 'placeholder-stat', value: '⚠️', label: 'Content Missing', order: 1 },
  ],
}

// GROQ query for hero content
const heroQuery = `*[_type == "hero"][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  headline,
  subheadline,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage{
    asset->{
      _id,
      url
    },
    hotspot,
    crop,
    alt
  },
  stats[] | order(order asc) {
    _key,
    value,
    label,
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

// Fetch hero content from Sanity
export async function getHeroContent(): Promise<HeroContent> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  
  try {
    const content = await withRetry(
      () => client.fetch(heroQuery, {}, { 
        cache: isEnabled ? 'no-store' : 'force-cache',
        next: { revalidate: isEnabled ? 0 : 60 }, // No cache in draft mode, 1 minute in production
      }),
      'Hero content fetch'
    )
    
    if (!content) {
      console.warn('No hero content found in Sanity, using placeholder content')
      return placeholderHeroContent
    }
    
    return content
  } catch (error) {
    console.error('Failed to fetch hero content from Sanity:', error)
    return placeholderHeroContent
  }
}

// Validate hero content structure
export function validateHeroContent(content: any): content is HeroContent {
  return (
    content &&
    typeof content === 'object' &&
    typeof content.headline === 'string' &&
    Array.isArray(content.description) &&
    content.primaryCTA &&
    typeof content.primaryCTA.text === 'string' &&
    typeof content.primaryCTA.url === 'string'
  )
}