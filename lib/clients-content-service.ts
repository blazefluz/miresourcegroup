import { getClient } from './sanity'
import { ClientsContent } from '@/types/sanity'
import { draftMode } from 'next/headers'

// Placeholder content when real content is deleted (clearly marked as placeholder)
const placeholderClientsContent: ClientsContent = {
  _id: 'placeholder-clients',
  _type: 'clients' as const,
  _createdAt: new Date().toISOString(),
  _updatedAt: new Date().toISOString(),
  headline: '[PLACEHOLDER] Industry Leaders We Serve',
  badgeText: 'Trusted Partners',
  clientLogos: [
    {
      _key: 'placeholder-1',
      companyName: 'Placeholder Company 1',
      logo: {
        _type: 'image',
        asset: {
          _ref: 'placeholder-ref-1',
          _type: 'reference'
        },
        alt: 'Placeholder Company 1 Logo'
      },
      altText: 'Placeholder Company 1 Logo',
      order: 1
    },
    {
      _key: 'placeholder-2',
      companyName: 'Placeholder Company 2',
      logo: {
        _type: 'image',
        asset: {
          _ref: 'placeholder-ref-2',
          _type: 'reference'
        },
        alt: 'Placeholder Company 2 Logo'
      },
      altText: 'Placeholder Company 2 Logo',
      order: 2
    },
    {
      _key: 'placeholder-3',
      companyName: 'Placeholder Company 3',
      logo: {
        _type: 'image',
        asset: {
          _ref: 'placeholder-ref-3',
          _type: 'reference'
        },
        alt: 'Placeholder Company 3 Logo'
      },
      altText: 'Placeholder Company 3 Logo',
      order: 3
    }
  ],
  animationSettings: {
    scrollSpeed: 35,
    pauseOnHover: true
  }
}

// GROQ query for clients content
const clientsQuery = `*[_type == "clients"][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  badgeText,
  headline,
  highlightedText,
  clientLogos[] | order(order asc) {
    _key,
    companyName,
    logo{
      asset->{
        _id,
        url
      },
      hotspot,
      crop,
      alt
    },
    altText,
    order
  },
  animationSettings,
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

// Fetch clients content from Sanity
export async function getClientsContent(): Promise<ClientsContent> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  
  try {
    const content = await withRetry(
      () => client.fetch(clientsQuery, {}, { 
        cache: isEnabled ? 'no-store' : 'force-cache',
        next: { revalidate: isEnabled ? 0 : 60 }, // No cache in draft mode, 1 minute in production
      }),
      'Clients content fetch'
    )
    
    if (!content) {
      console.warn('No clients content found in Sanity, using placeholder content')
      return placeholderClientsContent
    }
    
    return content
  } catch (error) {
    console.error('Failed to fetch clients content from Sanity:', error)
    return placeholderClientsContent
  }
}

// Validate clients content structure
export function validateClientsContent(content: any): content is ClientsContent {
  return (
    content &&
    typeof content === 'object' &&
    typeof content.headline === 'string' &&
    Array.isArray(content.clientLogos) &&
    content.clientLogos.length > 0
  )
}