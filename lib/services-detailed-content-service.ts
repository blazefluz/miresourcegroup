import { getClient } from './sanity'
import { draftMode } from 'next/headers'
import type { ServiceDetailed } from '@/types/sanity'

const servicesQuery = `*[_type == "serviceDetailed" && published == true] | order(order asc) {
  _id,
  _type,
  title,
  tagline,
  description,
  features,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  iconName,
  color,
  bgColor,
  subcategories[] | order(order asc),
  order,
  published
}`

// Placeholder content when no services are found
const placeholderServices: ServiceDetailed[] = [
  {
    _id: 'placeholder-1',
    _type: 'serviceDetailed',
    title: 'Engineering Services',
    tagline: 'Comprehensive engineering solutions',
    description: 'Please add services in Sanity Studio',
    features: ['Add services in Sanity Studio'],
    image: {
      asset: {
        _id: 'placeholder',
        url: '/placeholder.svg',
      },
      alt: 'Placeholder',
    },
    iconName: 'Wrench',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    subcategories: [],
    order: 1,
    published: true,
  },
]

export async function getServicesDetailed(): Promise<ServiceDetailed[]> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  
  try {
    const services = await client.fetch(servicesQuery, {}, {
      cache: isEnabled ? 'no-store' : 'force-cache',
      next: { revalidate: isEnabled ? 0 : 60 },
    })
    
    if (!services || services.length === 0) {
      console.warn('No services found in Sanity, using placeholder')
      return placeholderServices
    }
    
    return services
  } catch (error) {
    console.error('Failed to fetch detailed services:', error)
    return placeholderServices
  }
}

// Get a single service by ID
export async function getServiceById(id: string): Promise<ServiceDetailed | null> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  
  try {
    const service = await client.fetch(
      `*[_type == "serviceDetailed" && _id == $id][0] {
        _id,
        _type,
        title,
        tagline,
        description,
        features,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        iconName,
        color,
        bgColor,
        subcategories[] | order(order asc),
        order,
        published
      }`,
      { id },
      {
        cache: isEnabled ? 'no-store' : 'force-cache',
        next: { revalidate: isEnabled ? 0 : 60 },
      }
    )
    
    return service || null
  } catch (error) {
    console.error(`Failed to fetch service ${id}:`, error)
    return null
  }
}
