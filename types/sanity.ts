import type { PortableTextBlock } from 'sanity'

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    _id?: string
    url?: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

export interface HeroContent {
  _id: string
  _type: 'hero'
  _createdAt: string
  _updatedAt: string
  
  // Main content
  headline: string
  subheadline?: string
  description: PortableTextBlock[]
  
  // Call-to-action buttons
  primaryCTA: {
    text: string
    url: string
  }
  secondaryCTA?: {
    text: string
    url: string
  }
  
  // Visual elements
  backgroundImage?: SanityImageAsset
  
  // Statistics section
  stats?: Array<{
    _key: string
    value: string
    label: string
    order: number
  }>
  
  // SEO and metadata
  seo?: {
    title?: string
    description?: string
  }
}

export interface AboutFeature {
  _key: string
  title: string
  description: string
  icon: 'target' | 'award' | 'users' | 'zap' | 'briefcase' | 'settings' | 'shield' | 'trending-up' | 'heart' | 'globe'
  order: number
}

export interface AboutContent {
  _id: string
  _type: 'about'
  _createdAt: string
  _updatedAt: string
  
  // Main content
  badgeText?: string
  headline: string
  highlightedText?: string
  description: PortableTextBlock[]
  
  // Call-to-action
  ctaText?: string
  ctaUrl?: string
  
  // Features
  features?: AboutFeature[]
  
  // SEO and metadata
  seo?: {
    title?: string
    description?: string
  }
}

export interface ServiceItem {
  _key?: string
  title: string
  description: string
  icon: 'wrench' | 'truck' | 'briefcase' | 'settings' | 'shield' | 'zap' | 'globe' | 'users' | 'target' | 'award'
  features: string[]
  ctaText?: string
  ctaUrl?: string
  order: number
}

export interface ServicesContent {
  _id?: string
  _type?: 'services'
  _createdAt?: string
  _updatedAt?: string
  
  // Main content
  badgeText?: string
  headline: string
  highlightedText?: string
  description: PortableTextBlock[]
  
  // Services
  services: ServiceItem[]
  
  // SEO and metadata
  seo?: {
    title?: string
    description?: string
  }
}

export interface ValueItem {
  _key?: string
  title: string
  description: string
  icon: 'shield' | 'clock' | 'lightbulb' | 'heart-handshake' | 'check-circle' | 'award' | 'users' | 'zap' | 'target' | 'briefcase'
  order: number
}

export interface SuccessMetric {
  value?: string
  label?: string
  icon?: 'check-circle' | 'award' | 'target' | 'trending-up' | 'shield'
  show?: boolean
}

export interface ValuePropositionContent {
  _id?: string
  _type?: 'valueProposition'
  _createdAt?: string
  _updatedAt?: string
  
  // Main content
  badgeText?: string
  headline: string
  highlightedText?: string
  description: PortableTextBlock[]
  
  // Visual elements
  heroImage?: SanityImageAsset
  
  // Values
  values: ValueItem[]
  
  // Success metric
  successMetric?: SuccessMetric
  
  // SEO and metadata
  seo?: {
    title?: string
    description?: string
  }
}

export interface TestimonialItem {
  _key?: string
  quote: string
  author: string
  role: string
  company: string
  avatar?: SanityImageAsset
  featured?: boolean
  order: number
}

export interface CarouselSettings {
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  showDots?: boolean
}

export interface TestimonialsContent {
  _id?: string
  _type?: 'testimonials'
  _createdAt?: string
  _updatedAt?: string
  
  // Main content
  badgeText?: string
  headline: string
  highlightedText?: string
  
  // Testimonials
  testimonials: TestimonialItem[]
  
  // Carousel settings
  carouselSettings?: CarouselSettings
  
  // SEO and metadata
  seo?: {
    title?: string
    description?: string
  }
}

export interface HeaderContent {
  _id?: string
  _type?: 'header'
  _createdAt?: string
  _updatedAt?: string
  
  brandName: {
    primary: string
    secondary: string
  }
  navigation: Array<{
    _key?: string
    name: string
    href: string
    order: number
  }>
  ctaButton: {
    text: string
    url: string
  }
}

export interface ContactInfo {
  _key?: string
  label: string
  value: string
  icon: 'map-pin' | 'phone' | 'mail' | 'globe' | 'clock'
  order: number
}

export interface ContactContent {
  _id?: string
  _type?: 'contact'
  _createdAt?: string
  _updatedAt?: string
  
  // Main content
  badgeText: string
  headline: string
  highlightedText?: string
  description: PortableTextBlock[]
  
  // Contact information
  contactInfo: ContactInfo[]
  
  // Form settings
  formSettings: {
    submitButtonText: string
    successMessage: {
      title: string
      description: string
    }
  }
  
  // SEO and metadata
  seo?: {
    title?: string
    description?: string
  }
}

export interface FooterSection {
  _key?: string
  title: string
  links: Array<{
    _key?: string
    name: string
    href: string
  }>
  order: number
}

export interface SocialLink {
  _key?: string
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube'
  url: string
  order: number
}

export interface FooterContent {
  _id?: string
  _type?: 'footer'
  _createdAt?: string
  _updatedAt?: string
  
  brandName: {
    primary: string
    secondary: string
  }
  tagline: string
  socialLinks: SocialLink[]
  footerSections: FooterSection[]
  copyright: {
    companyName: string
  }
}

export interface ClientLogo {
  _key?: string
  companyName: string
  logo: SanityImageAsset
  altText: string
  order: number
}

export interface AnimationSettings {
  scrollSpeed?: number
  pauseOnHover?: boolean
}

export interface ClientsContent {
  _id?: string
  _type?: 'clients'
  _createdAt?: string
  _updatedAt?: string
  
  badgeText?: string
  headline: string
  highlightedText?: string
  clientLogos: ClientLogo[]
  animationSettings?: AnimationSettings
  
  seo?: {
    title?: string
    description?: string
  }
}
