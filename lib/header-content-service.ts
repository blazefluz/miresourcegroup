import { getClient } from './sanity'
import type { HeaderContent } from '@/types/sanity'

// Placeholder content for when CMS content is deleted
const placeholderHeaderContent: HeaderContent = {
  brandName: {
    primary: 'M.I',
    secondary: 'Resource'
  },
  navigation: [
    { name: 'Home', href: '#home', order: 1 },
    { name: 'About', href: '#about', order: 2 },
    { name: 'Services', href: '#services', order: 3 },
    { name: 'Why Us', href: '#why-us', order: 4 },
    { name: 'Contact', href: '#contact', order: 5 },
  ],
  ctaButton: {
    text: 'Get Started',
    url: '#contact'
  }
}

export async function getHeaderContent(): Promise<HeaderContent> {
  try {
    const client = getClient(false)
    
    const content = await client.fetch(`
      *[_type == "header"][0] {
        brandName,
        navigation[] | order(order asc),
        ctaButton
      }
    `)

    if (!content) {
      console.warn('⚠️ No header content found in CMS, using placeholder content')
      return placeholderHeaderContent
    }

    return content
  } catch (error) {
    console.error('❌ Failed to fetch header content:', error)
    return placeholderHeaderContent
  }
}