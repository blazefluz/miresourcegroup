import { client } from './sanity'
import { TestimonialsContent } from '@/types/sanity'

// GROQ query to fetch testimonials content
const testimonialsQuery = `*[_type == "testimonials" && _id == "testimonials-content"][0]{
  badgeText,
  headline,
  highlightedText,
  testimonials[]{
    quote,
    author,
    role,
    company,
    avatar{
      asset->{
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    featured,
    order
  } | order(featured desc, order asc),
  carouselSettings{
    autoPlay,
    autoPlayInterval,
    showNavigation,
    showDots
  },
  seo
}`

// Placeholder content when real content is deleted or unavailable
const placeholderTestimonialsContent: TestimonialsContent = {
  badgeText: 'Testimonials',
  headline: 'What Our Clients Say',
  highlightedText: 'Clients Say',
  testimonials: [
    {
      quote: 'M.I Resources has been instrumental in optimizing our supply chain operations. Their professionalism and expertise are unmatched in the industry.',
      author: 'Adebayo Johnson',
      role: 'Operations Director',
      company: 'Nigerian Oil Corp',
      featured: false,
      order: 1
    },
    {
      quote: 'We\'ve partnered with M.I Resource for over 5 years, and they consistently deliver exceptional results. Their engineering team is top-notch.',
      author: 'Sarah Okonkwo',
      role: 'Procurement Manager',
      company: 'Energy Solutions Ltd',
      featured: false,
      order: 2
    },
    {
      quote: 'The management services provided by M.I Resources transformed our operational efficiency. Highly recommended for any energy company.',
      author: 'Michael Eze',
      role: 'CEO',
      company: 'Delta Oil Services',
      featured: false,
      order: 3
    }
  ],
  carouselSettings: {
    autoPlay: false,
    autoPlayInterval: 5,
    showNavigation: true,
    showDots: true
  },
  seo: {
    title: 'Client Testimonials - M.I Resources',
    description: 'Read what our clients say about M.I Resources\' exceptional support services in Nigeria\'s energy sector.'
  }
}

/**
 * Fetches testimonials content from Sanity CMS
 * Returns placeholder content if real content is not available
 */
export async function getTestimonialsContent(): Promise<TestimonialsContent> {
  try {
    const content = await client.fetch(testimonialsQuery, {}, {
      cache: 'force-cache',
      next: { revalidate: 60 } // Revalidate every minute
    })

    // If no content found, return placeholder
    if (!content) {
      console.log('⚠️ No testimonials content found in CMS, using placeholder content')
      return placeholderTestimonialsContent
    }

    // Validate that we have the minimum required fields
    if (!content.headline || !Array.isArray(content.testimonials)) {
      console.log('⚠️ Incomplete testimonials content in CMS, using placeholder content')
      return placeholderTestimonialsContent
    }

    // Ensure testimonials are sorted by featured first, then by order
    if (content.testimonials && content.testimonials.length > 0) {
      content.testimonials.sort((a: any, b: any) => {
        // Featured testimonials first
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        // Then by order
        return (a.order || 0) - (b.order || 0)
      })
    }

    // Ensure carousel settings have defaults
    if (!content.carouselSettings) {
      content.carouselSettings = placeholderTestimonialsContent.carouselSettings
    }

    return content
  } catch (error) {
    console.error('❌ Error fetching testimonials content:', error)
    return placeholderTestimonialsContent
  }
}

/**
 * Checks if testimonials content exists in Sanity CMS
 */
export async function testimonialsContentExists(): Promise<boolean> {
  try {
    const content = await client.fetch(
      `*[_type == "testimonials" && _id == "testimonials-content"][0]._id`,
      {},
      { cache: 'no-store' }
    )
    return !!content
  } catch (error) {
    console.error('❌ Error checking testimonials content existence:', error)
    return false
  }
}