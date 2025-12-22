import { getClient } from './sanity'
import { PortableTextBlock } from 'sanity'
import type { ContactContent } from '@/types/sanity'

// Placeholder content for when CMS content is deleted
const placeholderContactContent: ContactContent = {
  badgeText: 'Contact Us',
  headline: 'Let\'s Start a Conversation',
  highlightedText: 'Conversation',
  description: [
    {
      _type: 'block',
      _key: 'placeholder-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'placeholder-span',
          text: 'Ready to elevate your operations? Get in touch with our team to discuss how M.I Resource Group can support your business needs.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  contactInfo: [
    {
      label: 'Address',
      value: 'Lagos, Nigeria',
      icon: 'map-pin',
      order: 1,
    },
    {
      label: 'Phone',
      value: '+234 123 456 7890',
      icon: 'phone',
      order: 2,
    },
    {
      label: 'Email',
      value: 'info@miresourcegroup.com',
      icon: 'mail',
      order: 3,
    },
  ],
  formSettings: {
    submitButtonText: 'Send Message',
    successMessage: {
      title: 'Message Sent!',
      description: 'Thank you for reaching out. We\'ll get back to you shortly.',
    },
  },
}

export async function getContactContent(): Promise<ContactContent> {
  try {
    const client = getClient(false)
    
    const content = await client.fetch(`
      *[_type == "contact"][0] {
        badgeText,
        headline,
        highlightedText,
        description,
        contactInfo[] | order(order asc),
        formSettings
      }
    `)

    if (!content) {
      console.warn('⚠️ No contact content found in CMS, using placeholder content')
      return placeholderContactContent
    }

    return content
  } catch (error) {
    console.error('❌ Failed to fetch contact content:', error)
    return placeholderContactContent
  }
}