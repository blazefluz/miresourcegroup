import { client } from './sanity'
import { ServicesContent } from '@/types/sanity'

// GROQ query to fetch services content
const servicesQuery = `*[_type == "services" && _id == "services-content"][0]{
  badgeText,
  headline,
  highlightedText,
  description,
  services[]{
    title,
    description,
    icon,
    features,
    ctaText,
    ctaUrl,
    order
  } | order(order asc),
  seo
}`

// Placeholder content when real content is deleted or unavailable
const placeholderServicesContent: ServicesContent = {
  badgeText: 'Our Services',
  headline: 'Comprehensive Solutions for the Energy Sector',
  highlightedText: 'Energy Sector',
  description: [
    {
      _type: 'block',
      _key: 'placeholder-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'placeholder-span',
          text: 'We provide a full spectrum of support services tailored to meet the unique demands of the Oil & Gas industry.',
          marks: []
        }
      ],
      markDefs: []
    }
  ],
  services: [
    {
      title: 'Engineering & Procurement',
      description: 'Comprehensive engineering solutions and procurement services for Oil & Gas operations, including equipment sourcing, technical consulting, and project management.',
      icon: 'wrench',
      features: [
        'Technical Consulting',
        'Equipment Sourcing', 
        'Project Management',
        'Quality Assurance'
      ],
      ctaText: 'Learn More',
      ctaUrl: '#contact',
      order: 1
    },
    {
      title: 'Supply Chain Management',
      description: 'End-to-end supply chain solutions ensuring seamless logistics, inventory management, and distribution across Nigeria\'s energy sector.',
      icon: 'truck',
      features: [
        'Logistics Coordination',
        'Inventory Management',
        'Distribution Networks',
        'Vendor Management'
      ],
      ctaText: 'Learn More',
      ctaUrl: '#contact',
      order: 2
    },
    {
      title: 'Management Services',
      description: 'Strategic management consulting and support services to optimize operations, enhance efficiency, and drive sustainable growth.',
      icon: 'briefcase',
      features: [
        'Operations Management',
        'Strategic Planning',
        'Compliance Support',
        'Training & Development'
      ],
      ctaText: 'Learn More',
      ctaUrl: '#contact',
      order: 3
    }
  ],
  seo: {
    title: 'Our Services - M.I Resource Group',
    description: 'Comprehensive engineering, supply chain, and management services for the Oil & Gas industry in Nigeria.'
  }
}

/**
 * Fetches services content from Sanity CMS
 * Returns placeholder content if real content is not available
 */
export async function getServicesContent(): Promise<ServicesContent> {
  try {
    const content = await client.fetch(servicesQuery, {}, {
      cache: 'force-cache',
      next: { revalidate: 60 } // Revalidate every minute
    })

    // If no content found, return placeholder
    if (!content) {
      console.log('⚠️ No services content found in CMS, using placeholder content')
      return placeholderServicesContent
    }

    // Validate that we have the minimum required fields
    if (!content.headline || !content.description || !Array.isArray(content.services)) {
      console.log('⚠️ Incomplete services content in CMS, using placeholder content')
      return placeholderServicesContent
    }

    // Ensure services are sorted by order
    if (content.services && content.services.length > 0) {
      content.services.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    }

    return content
  } catch (error) {
    console.error('❌ Error fetching services content:', error)
    return placeholderServicesContent
  }
}

/**
 * Checks if services content exists in Sanity CMS
 */
export async function servicesContentExists(): Promise<boolean> {
  try {
    const content = await client.fetch(
      `*[_type == "services" && _id == "services-content"][0]._id`,
      {},
      { cache: 'no-store' }
    )
    return !!content
  } catch (error) {
    console.error('❌ Error checking services content existence:', error)
    return false
  }
}