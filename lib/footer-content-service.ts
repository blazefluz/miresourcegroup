import { getClient } from './sanity'
import type { FooterContent } from '@/types/sanity'

// Placeholder content for when CMS content is deleted
const placeholderFooterContent: FooterContent = {
  brandName: {
    primary: 'M.I',
    secondary: 'Resource'
  },
  tagline: 'No.1 Support Services Provider in Nigeria\'s Oil & Gas Industry.',
  socialLinks: [
    { platform: 'linkedin', url: '#', order: 1 },
    { platform: 'twitter', url: '#', order: 2 },
    { platform: 'facebook', url: '#', order: 3 },
    { platform: 'instagram', url: '#', order: 4 },
  ],
  footerSections: [
    {
      title: 'Services',
      links: [
        { name: 'Engineering & Procurement', href: '#services' },
        { name: 'Supply Chain Management', href: '#services' },
        { name: 'Management Services', href: '#services' },
      ],
      order: 1,
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#about' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#contact' },
      ],
      order: 2,
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ],
      order: 3,
    },
  ],
  copyright: {
    companyName: 'M.I Resource Group',
  },
}

export async function getFooterContent(): Promise<FooterContent> {
  try {
    const client = getClient(false)
    
    const content = await client.fetch(`
      *[_type == "footer"][0] {
        brandName,
        tagline,
        socialLinks[] | order(order asc),
        footerSections[] | order(order asc) {
          title,
          links,
          order
        },
        copyright
      }
    `)

    if (!content) {
      console.warn('⚠️ No footer content found in CMS, using placeholder content')
      return placeholderFooterContent
    }

    // Filter out "Clients" link from all footer sections
    if (content.footerSections) {
      content.footerSections = content.footerSections.map((section: any) => ({
        ...section,
        links: section.links.filter((link: any) => 
          link.name.toLowerCase() !== 'clients' && 
          link.name.toLowerCase() !== 'our clients'
        )
      }))
    }

    return content
  } catch (error) {
    console.error('❌ Failed to fetch footer content:', error)
    return placeholderFooterContent
  }
}