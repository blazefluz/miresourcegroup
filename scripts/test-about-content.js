#!/usr/bin/env node

// Test about content functionality
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testAboutContent() {
  console.log('🧪 Testing About Content Integration...\n')

  try {
    // Test about content query
    console.log('🔍 Testing about content query...')
    const aboutContent = await client.fetch(`*[_type == "about"][0]{
      _id,
      _type,
      badgeText,
      headline,
      highlightedText,
      description,
      ctaText,
      ctaUrl,
      features[] | order(order asc) {
        _key,
        title,
        description,
        icon,
        order
      }
    }`)
    
    if (!aboutContent) {
      console.log('❌ No about content found')
      return
    }

    console.log('✅ About content found:')
    console.log(`   ID: ${aboutContent._id}`)
    console.log(`   Badge: "${aboutContent.badgeText}"`)
    console.log(`   Headline: "${aboutContent.headline}"`)
    console.log(`   Highlighted: "${aboutContent.highlightedText}"`)
    console.log(`   CTA: "${aboutContent.ctaText}" → ${aboutContent.ctaUrl}`)
    console.log(`   Features: ${aboutContent.features?.length || 0} items`)
    
    // Test features
    if (aboutContent.features && aboutContent.features.length > 0) {
      console.log('\n📋 Features:')
      aboutContent.features.forEach((feature, index) => {
        console.log(`   ${index + 1}. ${feature.title} (${feature.icon})`)
        console.log(`      "${feature.description.substring(0, 60)}..."`)
      })
    }

    // Test icon mapping
    console.log('\n🎨 Icon mapping test:')
    const iconMap = {
      target: '🎯',
      award: '🏆',
      users: '👥',
      zap: '⚡',
      briefcase: '💼',
      settings: '⚙️',
      shield: '🛡️',
      'trending-up': '📈',
      heart: '❤️',
      globe: '🌍',
    }
    
    aboutContent.features?.forEach(feature => {
      const emoji = iconMap[feature.icon] || '❓'
      console.log(`   ${emoji} ${feature.icon} → ${feature.title}`)
    })

    // Test schema validation
    console.log('\n✅ Schema validation:')
    const requiredFields = ['headline', 'description']
    const optionalFields = ['badgeText', 'highlightedText', 'ctaText', 'ctaUrl', 'features']
    
    requiredFields.forEach(field => {
      const hasField = aboutContent[field] !== undefined && aboutContent[field] !== null
      console.log(`   ${hasField ? '✅' : '❌'} ${field}: ${hasField ? 'Present' : 'Missing'}`)
    })
    
    optionalFields.forEach(field => {
      const hasField = aboutContent[field] !== undefined && aboutContent[field] !== null
      console.log(`   ${hasField ? '✅' : '⚪'} ${field}: ${hasField ? 'Present' : 'Optional (not set)'}`)
    })

    console.log('\n🎉 About content integration test completed successfully!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

// Run test if called directly
if (require.main === module) {
  testAboutContent()
}

module.exports = { testAboutContent }