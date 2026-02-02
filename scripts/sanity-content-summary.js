#!/usr/bin/env node

// Complete summary of Sanity content status
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function getSummary() {
  console.log('📊 SANITY CONTENT SUMMARY\n')
  console.log('=' .repeat(60))

  try {
    // Check all content types
    const contentTypes = [
      { type: 'hero', name: 'Hero Section', hasImages: true },
      { type: 'about', name: 'About Section', hasImages: true },
      { type: 'services', name: 'Services Section', hasImages: true },
      { type: 'valueProposition', name: 'Value Proposition', hasImages: false },
      { type: 'testimonials', name: 'Testimonials', hasImages: false },
      { type: 'clients', name: 'Clients Section', hasImages: true },
      { type: 'header', name: 'Header/Navigation', hasImages: false },
      { type: 'contact', name: 'Contact Section', hasImages: true },
      { type: 'footer', name: 'Footer', hasImages: false },
    ]

    let totalContent = 0
    let totalImages = 0
    let uploadedImages = 0

    for (const { type, name, hasImages } of contentTypes) {
      const content = await client.fetch(`*[_type == "${type}"][0]`)
      
      if (content) {
        totalContent++
        console.log(`\n✅ ${name}`)
        console.log(`   ID: ${content._id}`)
        
        if (type === 'hero') {
          console.log(`   Headline: "${content.headline}"`)
          console.log(`   Stats: ${content.stats?.length || 0} items`)
          if (content.backgroundImage?.asset) {
            uploadedImages++
            console.log(`   Background: ✅ Uploaded`)
          }
          totalImages++
        }
        
        if (type === 'about') {
          console.log(`   Headline: "${content.headline}"`)
          console.log(`   Features: ${content.features?.length || 0} items`)
          if (content.image?.asset) {
            uploadedImages++
            console.log(`   Image: ✅ Uploaded`)
          }
          totalImages++
        }
        
        if (type === 'services') {
          console.log(`   Headline: "${content.headline}"`)
          console.log(`   Services: ${content.services?.length || 0} items`)
          const servicesWithImages = content.services?.filter(s => s.image?.asset).length || 0
          uploadedImages += servicesWithImages
          totalImages += content.services?.length || 0
          console.log(`   Images: ${servicesWithImages}/${content.services?.length || 0} uploaded`)
        }
        
        if (type === 'clients') {
          console.log(`   Headline: "${content.headline}"`)
          const logosCount = content.clientLogos?.length || 0
          const logosWithImages = content.clientLogos?.filter(c => c.logo?.asset).length || 0
          uploadedImages += logosWithImages
          totalImages += logosCount
          console.log(`   Logos: ${logosWithImages}/${logosCount} uploaded`)
        }
        
        if (type === 'contact') {
          console.log(`   Headline: "${content.headline}"`)
          console.log(`   Contact Info: ${content.contactInfo?.length || 0} items`)
          if (content.image?.asset) {
            uploadedImages++
            console.log(`   Image: ✅ Uploaded`)
          }
          totalImages++
        }
        
        if (type === 'valueProposition') {
          console.log(`   Headline: "${content.headline}"`)
          console.log(`   Values: ${content.values?.length || 0} items`)
        }
        
        if (type === 'testimonials') {
          console.log(`   Headline: "${content.headline}"`)
          console.log(`   Testimonials: ${content.testimonials?.length || 0} items`)
          console.log(`   Note: Avatars are optional`)
        }
        
        if (type === 'header') {
          console.log(`   Brand: ${content.brandName?.primary} ${content.brandName?.secondary}`)
          console.log(`   Navigation: ${content.navigation?.length || 0} items`)
        }
        
        if (type === 'footer') {
          console.log(`   Brand: ${content.brandName?.primary} ${content.brandName?.secondary}`)
          console.log(`   Social Links: ${content.socialLinks?.length || 0} items`)
          console.log(`   Footer Sections: ${content.footerSections?.length || 0} items`)
        }
      } else {
        console.log(`\n❌ ${name}: Missing`)
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('\n📈 STATISTICS')
    console.log(`   Content Types: ${totalContent}/${contentTypes.length} uploaded`)
    console.log(`   Images: ${uploadedImages}/${totalImages} uploaded`)
    console.log(`   Completion: ${Math.round((uploadedImages / totalImages) * 100)}%`)

    console.log('\n🎯 STATUS')
    if (totalContent === contentTypes.length && uploadedImages === totalImages) {
      console.log('   ✅ All content and images uploaded!')
      console.log('   ✅ Your website is fully configured!')
    } else if (totalContent === contentTypes.length) {
      console.log('   ✅ All content uploaded!')
      console.log(`   ⚠️  ${totalImages - uploadedImages} images still missing`)
    } else {
      console.log(`   ⚠️  ${contentTypes.length - totalContent} content types missing`)
      console.log(`   ⚠️  ${totalImages - uploadedImages} images missing`)
    }

    console.log('\n💡 NEXT STEPS')
    console.log('   • View content: http://localhost:3000/studio')
    console.log('   • Edit content: https://miresourcesgroup.sanity.studio')
    console.log('   • View website: http://localhost:3000')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  getSummary().catch(console.error)
}

module.exports = { getSummary }
