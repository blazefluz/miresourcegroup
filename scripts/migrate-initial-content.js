#!/usr/bin/env node

// Migrate initial content to Sanity on first run
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Initial content definitions
const initialHeroContent = {
  _id: 'hero-content',
  _type: 'hero',
  headline: 'Powering Nigeria\'s Oil & Gas Industry',
  subheadline: 'Trusted by Industry Leaders',
  description: [
    {
      _type: 'block',
      _key: 'initial-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'initial-span',
          text: 'M.I Resource Group delivers comprehensive support services in Engineering, Procurement, Supply Chain Management, and Management Services to the energy sector.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  primaryCTA: {
    text: 'Explore Services',
    url: '#services',
  },
  secondaryCTA: {
    text: 'Learn More',
    url: '#about',
  },
  stats: [
    { _key: 'stat1', value: '15+', label: 'Years Experience', order: 1 },
    { _key: 'stat2', value: '200+', label: 'Projects Completed', order: 2 },
    { _key: 'stat3', value: '50+', label: 'Expert Team', order: 3 },
    { _key: 'stat4', value: '100%', label: 'Client Satisfaction', order: 4 },
  ],
}

const initialAboutContent = {
  _id: 'about-content',
  _type: 'about',
  badgeText: 'About Us',
  headline: 'Building the Future of Energy Services',
  highlightedText: 'Energy Services',
  description: [
    {
      _type: 'block',
      _key: 'about-desc-1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'about-span-1',
          text: 'M.I Resource Group has established itself as the leading support services provider in Nigeria\'s Oil & Gas industry. With over 15 years of experience, we deliver comprehensive solutions in Engineering & Procurement, Supply Chain Management, and Management Services.',
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'about-desc-2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'about-span-2',
          text: 'Our commitment to excellence, safety, and innovation has earned us the trust of major energy companies and positioned us as a vital partner in the nation\'s economic development.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  ctaText: 'Partner with us',
  ctaUrl: '#contact',
  features: [
    {
      _key: 'feature-1',
      title: 'Our Mission',
      description: 'To provide exceptional support services that drive the success of Nigeria\'s energy sector through innovation and excellence.',
      icon: 'target',
      order: 1,
    },
    {
      _key: 'feature-2',
      title: 'Our Vision',
      description: 'To be the most trusted and preferred partner for comprehensive support services in the Oil & Gas industry across Africa.',
      icon: 'award',
      order: 2,
    },
    {
      _key: 'feature-3',
      title: 'Our People',
      description: 'A team of highly skilled professionals with decades of combined experience in engineering, procurement, and management.',
      icon: 'users',
      order: 3,
    },
    {
      _key: 'feature-4',
      title: 'Our Approach',
      description: 'Combining industry expertise with cutting-edge solutions to deliver results that exceed expectations every time.',
      icon: 'zap',
      order: 4,
    },
  ],
}
const initialServicesContent = {
  _id: 'services-content',
  _type: 'services',
  badgeText: 'Our Services',
  headline: 'Comprehensive Solutions for the Energy Sector',
  highlightedText: 'Energy Sector',
  description: [
    {
      _type: 'block',
      _key: 'services-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'services-span',
          text: 'We provide a full spectrum of support services tailored to meet the unique demands of the Oil & Gas industry.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  services: [
    {
      _key: 'service-1',
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
      order: 1,
    },
    {
      _key: 'service-2',
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
      order: 2,
    },
    {
      _key: 'service-3',
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
      order: 3,
    },
  ],
}

const initialValuePropositionContent = {
  _id: 'value-proposition-content',
  _type: 'valueProposition',
  badgeText: 'Why Choose Us',
  headline: 'Your Trusted Partner in Energy Excellence',
  highlightedText: 'Energy Excellence',
  description: [
    {
      _type: 'block',
      _key: 'value-prop-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'value-prop-span',
          text: 'With a proven track record and unwavering commitment to quality, M.I Resource Group stands as the premier choice for support services in Nigeria\'s energy sector.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  values: [
    {
      _key: 'value-1',
      title: 'Safety First',
      description: 'Uncompromising commitment to safety standards and practices',
      icon: 'shield',
      order: 1,
    },
    {
      _key: 'value-2',
      title: 'On-Time Delivery',
      description: 'Reliable project completion within agreed timelines',
      icon: 'clock',
      order: 2,
    },
    {
      _key: 'value-3',
      title: 'Innovation',
      description: 'Cutting-edge solutions for complex challenges',
      icon: 'lightbulb',
      order: 3,
    },
    {
      _key: 'value-4',
      title: 'Partnership',
      description: 'Building lasting relationships with our clients',
      icon: 'heart-handshake',
      order: 4,
    },
  ],
  successMetric: {
    value: '100%',
    label: 'Project Success Rate',
    icon: 'check-circle',
    show: true,
  },
}

const initialTestimonialsContent = {
  _id: 'testimonials-content',
  _type: 'testimonials',
  badgeText: 'Testimonials',
  headline: 'What Our Clients Say',
  highlightedText: 'Clients Say',
  testimonials: [
    {
      _key: 'testimonial-1',
      quote: 'M.I Resource Group has been instrumental in optimizing our supply chain operations. Their professionalism and expertise are unmatched in the industry.',
      author: 'Adebayo Johnson',
      role: 'Operations Director',
      company: 'Nigerian Oil Corp',
      featured: false,
      order: 1,
    },
    {
      _key: 'testimonial-2',
      quote: 'We\'ve partnered with M.I Resource for over 5 years, and they consistently deliver exceptional results. Their engineering team is top-notch.',
      author: 'Sarah Okonkwo',
      role: 'Procurement Manager',
      company: 'Energy Solutions Ltd',
      featured: false,
      order: 2,
    },
    {
      _key: 'testimonial-3',
      quote: 'The management services provided by M.I Resource Group transformed our operational efficiency. Highly recommended for any energy company.',
      author: 'Michael Eze',
      role: 'CEO',
      company: 'Delta Oil Services',
      featured: false,
      order: 3,
    },
  ],
  carouselSettings: {
    autoPlay: false,
    autoPlayInterval: 5,
    showNavigation: true,
    showDots: true,
  },
}
const initialHeaderContent = {
  _id: 'header-content',
  _type: 'header',
  brandName: {
    primary: 'M.I',
    secondary: 'Resource',
  },
  navigation: [
    { _key: 'nav-1', name: 'Home', href: '#home', order: 1 },
    { _key: 'nav-2', name: 'About', href: '#about', order: 2 },
    { _key: 'nav-3', name: 'Services', href: '#services', order: 3 },
    { _key: 'nav-4', name: 'Why Us', href: '#why-us', order: 4 },
    { _key: 'nav-5', name: 'Contact', href: '#contact', order: 5 },
  ],
  ctaButton: {
    text: 'Get Started',
    url: '#contact',
  },
}

const initialContactContent = {
  _id: 'contact-content',
  _type: 'contact',
  badgeText: 'Contact Us',
  headline: 'Let\'s Start a Conversation',
  highlightedText: 'Conversation',
  description: [
    {
      _type: 'block',
      _key: 'contact-desc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'contact-span',
          text: 'Ready to elevate your operations? Get in touch with our team to discuss how M.I Resource Group can support your business needs.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  contactInfo: [
    {
      _key: 'contact-info-1',
      label: 'Address',
      value: 'Lagos, Nigeria',
      icon: 'map-pin',
      order: 1,
    },
    {
      _key: 'contact-info-2',
      label: 'Phone',
      value: '+234 123 456 7890',
      icon: 'phone',
      order: 2,
    },
    {
      _key: 'contact-info-3',
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

const initialFooterContent = {
  _id: 'footer-content',
  _type: 'footer',
  brandName: {
    primary: 'M.I',
    secondary: 'Resource',
  },
  tagline: 'No.1 Support Services Provider in Nigeria\'s Oil & Gas Industry.',
  socialLinks: [
    { _key: 'social-1', platform: 'linkedin', url: '#', order: 1 },
    { _key: 'social-2', platform: 'twitter', url: '#', order: 2 },
    { _key: 'social-3', platform: 'facebook', url: '#', order: 3 },
    { _key: 'social-4', platform: 'instagram', url: '#', order: 4 },
  ],
  footerSections: [
    {
      _key: 'footer-section-1',
      title: 'Services',
      links: [
        { _key: 'link-1-1', name: 'Engineering & Procurement', href: '#services' },
        { _key: 'link-1-2', name: 'Supply Chain Management', href: '#services' },
        { _key: 'link-1-3', name: 'Management Services', href: '#services' },
      ],
      order: 1,
    },
    {
      _key: 'footer-section-2',
      title: 'Company',
      links: [
        { _key: 'link-2-1', name: 'About Us', href: '#about' },
        { _key: 'link-2-2', name: 'Our Team', href: '#about' },
        { _key: 'link-2-3', name: 'Careers', href: '#' },
        { _key: 'link-2-4', name: 'Contact', href: '#contact' },
      ],
      order: 2,
    },
    {
      _key: 'footer-section-3',
      title: 'Legal',
      links: [
        { _key: 'link-3-1', name: 'Privacy Policy', href: '#' },
        { _key: 'link-3-2', name: 'Terms of Service', href: '#' },
      ],
      order: 3,
    },
  ],
  copyright: {
    companyName: 'M.I Resource Group',
  },
}

const initialClientsContent = {
  _id: 'clients-content',
  _type: 'clients',
  badgeText: 'Trusted Partners',
  headline: 'Industry Leaders We Serve',
  highlightedText: 'Industry Leaders',
  clientLogos: [
    {
      _key: 'client-1',
      companyName: 'Deltatek Offshore',
      altText: 'Deltatek Offshore Logo',
      order: 1,
    },
    {
      _key: 'client-2',
      companyName: 'Nigeria LNG Limited',
      altText: 'Nigeria LNG Limited Logo',
      order: 2,
    },
    {
      _key: 'client-3',
      companyName: 'NNPC',
      altText: 'NNPC Logo',
      order: 3,
    },
    {
      _key: 'client-4',
      companyName: 'Addax Petroleum',
      altText: 'Addax Petroleum Logo',
      order: 4,
    },
    {
      _key: 'client-5',
      companyName: 'Chevron',
      altText: 'Chevron Logo',
      order: 5,
    },
    {
      _key: 'client-6',
      companyName: 'ExxonMobil',
      altText: 'ExxonMobil Logo',
      order: 6,
    },
  ],
  animationSettings: {
    scrollSpeed: 35,
    pauseOnHover: true,
  },
}
// Migration functions
async function migrateContent(contentType, content, displayName) {
  try {
    const existingContent = await client.fetch(`*[_type == "${contentType}"][0]`)
    
    if (existingContent) {
      console.log(`✅ ${displayName} content already exists, skipping migration`)
      return
    }

    console.log(`📝 Creating initial ${displayName.toLowerCase()} content...`)
    const result = await client.createOrReplace(content)
    
    console.log(`✅ Initial ${displayName.toLowerCase()} content created successfully!`)
    console.log(`   Document ID: ${result._id}`)
    
  } catch (error) {
    console.error(`❌ ${displayName} migration failed:`, error.message)
    throw error
  }
}

async function migrateAllContent() {
  console.log('🚀 Starting complete content migration...\n')

  try {
    await migrateContent('hero', initialHeroContent, 'Hero')
    await migrateContent('about', initialAboutContent, 'About')
    await migrateContent('services', initialServicesContent, 'Services')
    await migrateContent('valueProposition', initialValuePropositionContent, 'Value Proposition')
    await migrateContent('testimonials', initialTestimonialsContent, 'Testimonials')
    await migrateContent('header', initialHeaderContent, 'Header')
    await migrateContent('contact', initialContactContent, 'Contact')
    await migrateContent('footer', initialFooterContent, 'Footer')
    await migrateContent('clients', initialClientsContent, 'Clients')
    
    console.log('\n🎉 Migration completed successfully!')
    console.log('💡 You can now edit this content in the studio at:')
    console.log('   • Local: http://localhost:3000/studio')
    console.log('   • Hosted: https://miresourcesgroup.sanity.studio')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
    
    process.exit(1)
  }
}

// Individual migration functions for backward compatibility
const migrateHeroContent = () => migrateContent('hero', initialHeroContent, 'Hero')
const migrateAboutContent = () => migrateContent('about', initialAboutContent, 'About')
const migrateServicesContent = () => migrateContent('services', initialServicesContent, 'Services')
const migrateValuePropositionContent = () => migrateContent('valueProposition', initialValuePropositionContent, 'Value Proposition')
const migrateTestimonialsContent = () => migrateContent('testimonials', initialTestimonialsContent, 'Testimonials')
const migrateHeaderContent = () => migrateContent('header', initialHeaderContent, 'Header')
const migrateContactContent = () => migrateContent('contact', initialContactContent, 'Contact')
const migrateFooterContent = () => migrateContent('footer', initialFooterContent, 'Footer')
const migrateClientsContent = () => migrateContent('clients', initialClientsContent, 'Clients')

// Main migration function
const migrateInitialContent = migrateAllContent

// Run migration if called directly
if (require.main === module) {
  migrateAllContent()
}

module.exports = { 
  migrateInitialContent, 
  migrateAllContent,
  migrateHeroContent, 
  migrateAboutContent, 
  migrateServicesContent, 
  migrateValuePropositionContent, 
  migrateTestimonialsContent,
  migrateHeaderContent,
  migrateContactContent,
  migrateFooterContent,
  migrateClientsContent
}