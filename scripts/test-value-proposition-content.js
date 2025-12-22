#!/usr/bin/env node

// Test script to verify value proposition content integration
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
  shield: '🛡️',
  clock: '🕐',
  lightbulb: '💡',
  'heart-handshake': '🤝',
  'check-circle': '✅',
  award: '🏆',
  users: '👥',
  zap: '⚡',
  target: '🎯',
  briefcase: '💼',
  'trending-up': '📈',
}

async function testValuePropositionContent() {
  console.log('🧪 Testing Value Proposition Content Integration...\n')

  try {
    // Test value proposition content query
    console.log('🔍 Testing value proposition content query...')
    const valuePropositionContent = await client.fetch(`
      *[_type == "valueProposition" && _id == "value-proposition-content"][0]{
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
      }
    `)

    if (!valuePropositionContent) {
      console.log('❌ No value proposition content found')
      console.log('💡 Run: node scripts/migrate-initial-content.js')
      process.exit(1)
    }

    console.log('✅ Value proposition content found:')
    console.log(`   ID: value-proposition-content`)
    console.log(`   Badge: "${valuePropositionContent.badgeText}"`)
    console.log(`   Headline: "${valuePropositionContent.headline}"`)
    console.log(`   Highlighted: "${valuePropositionContent.highlightedText}"`)
    console.log(`   Values: ${valuePropositionContent.values?.length || 0} items`)
    console.log(`   Hero Image: ${valuePropositionContent.heroImage ? 'Present' : 'Missing'}`)
    console.log(`   Success Metric: ${valuePropositionContent.successMetric?.show ? 'Enabled' : 'Disabled'}\n`)

    // Display values
    if (valuePropositionContent.values && valuePropositionContent.values.length > 0) {
      console.log('📋 Values:')
      valuePropositionContent.values.forEach((value, index) => {
        const icon = iconEmojis[value.icon] || '📦'
        console.log(`   ${index + 1}. ${value.title} (${icon} ${value.icon})`)
        console.log(`      "${value.description}"`)
      })
      console.log('')
    }

    // Display success metric
    if (valuePropositionContent.successMetric) {
      console.log('🎯 Success Metric:')
      const metric = valuePropositionContent.successMetric
      const icon = iconEmojis[metric.icon] || '📊'
      console.log(`   ${metric.value} ${metric.label} (${icon} ${metric.icon})`)
      console.log(`   Visible: ${metric.show ? 'Yes' : 'No'}`)
      console.log('')
    }

    // Test icon mapping
    console.log('🎨 Icon mapping test:')
    const uniqueIcons = [...new Set([
      ...(valuePropositionContent.values?.map(v => v.icon) || []),
      valuePropositionContent.successMetric?.icon
    ].filter(Boolean))]
    
    uniqueIcons.forEach(icon => {
      const emoji = iconEmojis[icon] || '❓'
      console.log(`   ${emoji} ${icon}`)
    })
    console.log('')

    // Validate schema fields
    console.log('✅ Schema validation:')
    const requiredFields = ['headline', 'description', 'values']
    const optionalFields = ['badgeText', 'highlightedText', 'heroImage', 'successMetric', 'seo']
    
    requiredFields.forEach(field => {
      const hasField = valuePropositionContent[field] !== undefined && valuePropositionContent[field] !== null
      console.log(`   ${hasField ? '✅' : '❌'} ${field}: ${hasField ? 'Present' : 'Missing'}`)
    })
    
    optionalFields.forEach(field => {
      const hasField = valuePropositionContent[field] !== undefined && valuePropositionContent[field] !== null
      console.log(`   ${hasField ? '✅' : '⚠️'} ${field}: ${hasField ? 'Present' : 'Optional (not set)'}`)
    })
    console.log('')

    // Validate value cards
    if (valuePropositionContent.values && valuePropositionContent.values.length > 0) {
      console.log('✅ Value card validation:')
      valuePropositionContent.values.forEach((value, index) => {
        const hasTitle = !!value.title
        const hasDescription = !!value.description
        const hasIcon = !!value.icon
        const hasOrder = typeof value.order === 'number'
        
        console.log(`   Value ${index + 1}: ${value.title}`)
        console.log(`      ${hasTitle ? '✅' : '❌'} Title`)
        console.log(`      ${hasDescription ? '✅' : '❌'} Description`)
        console.log(`      ${hasIcon ? '✅' : '❌'} Icon`)
        console.log(`      ${hasOrder ? '✅' : '❌'} Order (${value.order})`)
      })
      console.log('')
    }

    // Validate hero image
    if (valuePropositionContent.heroImage) {
      console.log('🖼️ Hero image validation:')
      const hasAsset = !!valuePropositionContent.heroImage.asset
      const hasUrl = !!valuePropositionContent.heroImage.asset?.url
      const hasAlt = !!valuePropositionContent.heroImage.alt
      
      console.log(`   ${hasAsset ? '✅' : '❌'} Asset: ${hasAsset ? 'Present' : 'Missing'}`)
      console.log(`   ${hasUrl ? '✅' : '❌'} URL: ${hasUrl ? 'Present' : 'Missing'}`)
      console.log(`   ${hasAlt ? '✅' : '⚠️'} Alt Text: ${hasAlt ? 'Present' : 'Missing (accessibility issue)'}`)
      if (hasUrl) {
        console.log(`   📍 Image URL: ${valuePropositionContent.heroImage.asset.url}`)
      }
      console.log('')
    }

    console.log('🎉 Value proposition content integration test completed successfully!')

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
testValuePropositionContent()