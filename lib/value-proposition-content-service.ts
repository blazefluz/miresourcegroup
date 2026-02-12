import { client } from './sanity'
import { ValuePropositionContent } from '@/types/sanity'

// GROQ query to fetch value proposition content
const valuePropositionQuery = `*[_type == "valueProposition" && _id == "value-proposition-content"][0]{
  badgeText,
  headline,
  highlightedText,
  description,
  heroImage{
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  values[]{
    title,
    description,
    icon,
    order
  } | order(order asc),
  successMetric{
    value,
    label,
    icon,
    show
  },
  seo
}`

// Placeholder content when real content is deleted or unavailable
const placeholderValuePropositionContent: ValuePropositionContent = {
  badgeText: 'Why Choose Us',
  headline: 'Your Trusted Partner in Energy Excellence',
  highlightedText: 'Energy Excellence',
  description: [
    {
      _type: 'block',
      _key: 'placeholder-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'placeholder-span',
          text: 'With a proven track record and unwavering commitment to quality, M.I Resources stands as the premier choice for support services in Nigeria\'s energy sector.',
          marks: []
        }
      ],
      markDefs: []
    }
  ],
  heroImage: {
    _type: 'image',
    asset: {
      _ref: 'image-placeholder-600x600-jpg',
      _type: 'reference'
    },
    alt: 'M.I Resources Team',
    hotspot: {
      x: 0.5,
      y: 0.5,
      height: 0.8,
      width: 0.8
    }
  },
  values: [
    {
      title: 'Safety First',
      description: 'Uncompromising commitment to safety standards and practices',
      icon: 'shield',
      order: 1
    },
    {
      title: 'On-Time Delivery',
      description: 'Reliable project completion within agreed timelines',
      icon: 'clock',
      order: 2
    },
    {
      title: 'Innovation',
      description: 'Cutting-edge solutions for complex challenges',
      icon: 'lightbulb',
      order: 3
    },
    {
      title: 'Partnership',
      description: 'Building lasting relationships with our clients',
      icon: 'heart-handshake',
      order: 4
    }
  ],
  successMetric: {
    value: '100%',
    label: 'Project Success Rate',
    icon: 'check-circle',
    show: true
  },
  seo: {
    title: 'Why Choose Us - M.I Resources',
    description: 'Discover why M.I Resources is the trusted partner for energy sector support services in Nigeria.'
  }
}

/**
 * Fetches value proposition content from Sanity CMS
 * Returns placeholder content if real content is not available
 */
export async function getValuePropositionContent(): Promise<ValuePropositionContent> {
  try {
    const content = await client.fetch(valuePropositionQuery, {}, {
      cache: 'force-cache',
      next: { revalidate: 60 } // Revalidate every minute
    })

    // If no content found, return placeholder
    if (!content) {
      console.log('⚠️ No value proposition content found in CMS, using placeholder content')
      return placeholderValuePropositionContent
    }

    // Validate that we have the minimum required fields
    if (!content.headline || !content.description || !Array.isArray(content.values)) {
      console.log('⚠️ Incomplete value proposition content in CMS, using placeholder content')
      return placeholderValuePropositionContent
    }

    // Ensure values are sorted by order
    if (content.values && content.values.length > 0) {
      content.values.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    }

    return content
  } catch (error) {
    console.error('❌ Error fetching value proposition content:', error)
    return placeholderValuePropositionContent
  }
}

/**
 * Checks if value proposition content exists in Sanity CMS
 */
export async function valuePropositionContentExists(): Promise<boolean> {
  try {
    const content = await client.fetch(
      `*[_type == "valueProposition" && _id == "value-proposition-content"][0]._id`,
      {},
      { cache: 'no-store' }
    )
    return !!content
  } catch (error) {
    console.error('❌ Error checking value proposition content existence:', error)
    return false
  }
}