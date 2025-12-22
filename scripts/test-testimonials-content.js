#!/usr/bin/env node

// Test script to verify testimonials content integration
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testTestimonialsContent() {
  console.log('🧪 Testing Testimonials Content Integration...\n')

  try {
    // Test testimonials content query
    console.log('🔍 Testing testimonials content query...')
    const testimonialsContent = await client.fetch(`
      *[_type == "testimonials" && _id == "testimonials-content"][0]{
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
      }
    `)

    if (!testimonialsContent) {
      console.log('❌ No testimonials content found')
      console.log('💡 Run: node scripts/migrate-initial-content.js')
      process.exit(1)
    }

    console.log('✅ Testimonials content found:')
    console.log(`   ID: testimonials-content`)
    console.log(`   Badge: "${testimonialsContent.badgeText}"`)
    console.log(`   Headline: "${testimonialsContent.headline}"`)
    console.log(`   Highlighted: "${testimonialsContent.highlightedText}"`)
    console.log(`   Testimonials: ${testimonialsContent.testimonials?.length || 0} items`)
    console.log(`   Auto-play: ${testimonialsContent.carouselSettings?.autoPlay ? 'Enabled' : 'Disabled'}\n`)

    // Display testimonials
    if (testimonialsContent.testimonials && testimonialsContent.testimonials.length > 0) {
      console.log('💬 Testimonials:')
      testimonialsContent.testimonials.forEach((testimonial, index) => {
        const featuredLabel = testimonial.featured ? ' ⭐' : ''
        console.log(`   ${index + 1}. ${testimonial.author}${featuredLabel} - ${testimonial.role}`)
        console.log(`      Company: ${testimonial.company}`)
        console.log(`      Quote: "${testimonial.quote.substring(0, 80)}..."`)
        console.log(`      Avatar: ${testimonial.avatar ? 'Present' : 'None'}`)
        console.log(`      Order: ${testimonial.order}`)
        console.log('')
      })
    }

    // Display carousel settings
    if (testimonialsContent.carouselSettings) {
      console.log('🎠 Carousel Settings:')
      const settings = testimonialsContent.carouselSettings
      console.log(`   Auto-play: ${settings.autoPlay ? 'Enabled' : 'Disabled'}`)
      if (settings.autoPlay) {
        console.log(`   Interval: ${settings.autoPlayInterval || 5} seconds`)
      }
      console.log(`   Navigation: ${settings.showNavigation !== false ? 'Enabled' : 'Disabled'}`)
      console.log(`   Dots: ${settings.showDots !== false ? 'Enabled' : 'Disabled'}`)
      console.log('')
    }

    // Validate schema fields
    console.log('✅ Schema validation:')
    const requiredFields = ['headline', 'testimonials']
    const optionalFields = ['badgeText', 'highlightedText', 'carouselSettings', 'seo']
    
    requiredFields.forEach(field => {
      const hasField = testimonialsContent[field] !== undefined && testimonialsContent[field] !== null
      console.log(`   ${hasField ? '✅' : '❌'} ${field}: ${hasField ? 'Present' : 'Missing'}`)
    })
    
    optionalFields.forEach(field => {
      const hasField = testimonialsContent[field] !== undefined && testimonialsContent[field] !== null
      console.log(`   ${hasField ? '✅' : '⚠️'} ${field}: ${hasField ? 'Present' : 'Optional (not set)'}`)
    })
    console.log('')

    // Validate testimonial cards
    if (testimonialsContent.testimonials && testimonialsContent.testimonials.length > 0) {
      console.log('✅ Testimonial card validation:')
      testimonialsContent.testimonials.forEach((testimonial, index) => {
        const hasQuote = !!testimonial.quote
        const hasAuthor = !!testimonial.author
        const hasRole = !!testimonial.role
        const hasCompany = !!testimonial.company
        const hasOrder = typeof testimonial.order === 'number'
        const hasAvatar = !!testimonial.avatar
        
        console.log(`   Testimonial ${index + 1}: ${testimonial.author}`)
        console.log(`      ${hasQuote ? '✅' : '❌'} Quote (${testimonial.quote?.length || 0} chars)`)
        console.log(`      ${hasAuthor ? '✅' : '❌'} Author`)
        console.log(`      ${hasRole ? '✅' : '❌'} Role`)
        console.log(`      ${hasCompany ? '✅' : '❌'} Company`)
        console.log(`      ${hasOrder ? '✅' : '❌'} Order (${testimonial.order})`)
        console.log(`      ${hasAvatar ? '✅' : '⚠️'} Avatar (${hasAvatar ? 'Present' : 'None'})`)
        console.log(`      ${testimonial.featured ? '⭐' : '📝'} Featured: ${testimonial.featured ? 'Yes' : 'No'}`)
      })
      console.log('')
    }

    // Test sorting (featured first, then by order)
    if (testimonialsContent.testimonials && testimonialsContent.testimonials.length > 1) {
      console.log('🔄 Sorting validation:')
      let sortingCorrect = true
      let lastFeatured = true
      let lastOrder = 0
      
      testimonialsContent.testimonials.forEach((testimonial, index) => {
        if (lastFeatured && !testimonial.featured) {
          lastFeatured = false
          lastOrder = 0 // Reset order tracking when switching from featured to non-featured
        } else if (!lastFeatured && testimonial.featured) {
          sortingCorrect = false
        }
        
        if (!testimonial.featured || lastFeatured) {
          if (testimonial.order < lastOrder) {
            sortingCorrect = false
          }
          lastOrder = testimonial.order
        }
      })
      
      console.log(`   ${sortingCorrect ? '✅' : '❌'} Testimonials sorted correctly (featured first, then by order)`)
      console.log('')
    }

    console.log('🎉 Testimonials content integration test completed successfully!')

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
testTestimonialsContent()