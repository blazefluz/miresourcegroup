#!/usr/bin/env node

// Test script to verify services content integration
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Icon emoji mapping for display
const iconEmojis = {
  wrench: '🔧',
  truck: '🚚',
  briefcase: '💼',
  settings: '⚙️',
  shield: '🛡️',
  zap: '⚡',
  globe: '🌍',
  users: '👥',
  target: '🎯',
  award: '🏆',
}

async function testServicesContent() {
  console.log('🧪 Testing Services Content Integration...\n')

  try {
    // Test services content query
    console.log('🔍 Testing services content query...')
    const servicesContent = await client.fetch(`
      *[_type == "services" && _id == "services-content"][0]{
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
      }
    `)

    if (!servicesContent) {
      console.log('❌ No services content found')
      console.log('💡 Run: node scripts/migrate-initial-content.js')
      process.exit(1)
    }

    console.log('✅ Services content found:')
    console.log(`   ID: services-content`)
    console.log(`   Badge: "${servicesContent.badgeText}"`)
    console.log(`   Headline: "${servicesContent.headline}"`)
    console.log(`   Highlighted: "${servicesContent.highlightedText}"`)
    console.log(`   Services: ${servicesContent.services?.length || 0} items\n`)

    // Display services
    if (servicesContent.services && servicesContent.services.length > 0) {
      console.log('📋 Services:')
      servicesContent.services.forEach((service, index) => {
        const icon = iconEmojis[service.icon] || '📦'
        console.log(`   ${index + 1}. ${service.title} (${icon} ${service.icon})`)
        console.log(`      "${service.description.substring(0, 60)}..."`)
        if (service.features && service.features.length > 0) {
          console.log(`      Features: ${service.features.length} items`)
          service.features.forEach(feature => {
            console.log(`        • ${feature}`)
          })
        }
      })
      console.log('')
    }

    // Test icon mapping
    console.log('🎨 Icon mapping test:')
    const uniqueIcons = [...new Set(servicesContent.services?.map(s => s.icon) || [])]
    uniqueIcons.forEach(icon => {
      const emoji = iconEmojis[icon] || '❓'
      const service = servicesContent.services.find(s => s.icon === icon)
      console.log(`   ${emoji} ${icon} → ${service?.title}`)
    })
    console.log('')

    // Validate schema fields
    console.log('✅ Schema validation:')
    const requiredFields = ['headline', 'description', 'services']
    const optionalFields = ['badgeText', 'highlightedText', 'seo']
    
    requiredFields.forEach(field => {
      const hasField = servicesContent[field] !== undefined && servicesContent[field] !== null
      console.log(`   ${hasField ? '✅' : '❌'} ${field}: ${hasField ? 'Present' : 'Missing'}`)
    })
    
    optionalFields.forEach(field => {
      const hasField = servicesContent[field] !== undefined && servicesContent[field] !== null
      console.log(`   ${hasField ? '✅' : '⚠️'} ${field}: ${hasField ? 'Present' : 'Optional (not set)'}`)
    })
    console.log('')

    // Validate service cards
    if (servicesContent.services && servicesContent.services.length > 0) {
      console.log('✅ Service card validation:')
      servicesContent.services.forEach((service, index) => {
        const hasTitle = !!service.title
        const hasDescription = !!service.description
        const hasIcon = !!service.icon
        const hasFeatures = Array.isArray(service.features) && service.features.length > 0
        const hasOrder = typeof service.order === 'number'
        
        console.log(`   Service ${index + 1}: ${service.title}`)
        console.log(`      ${hasTitle ? '✅' : '❌'} Title`)
        console.log(`      ${hasDescription ? '✅' : '❌'} Description`)
        console.log(`      ${hasIcon ? '✅' : '❌'} Icon`)
        console.log(`      ${hasFeatures ? '✅' : '⚠️'} Features (${service.features?.length || 0})`)
        console.log(`      ${hasOrder ? '✅' : '❌'} Order (${service.order})`)
      })
      console.log('')
    }

    console.log('🎉 Services content integration test completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
    
    process.exit(1)
  }
}

// Run test
testServicesContent()
