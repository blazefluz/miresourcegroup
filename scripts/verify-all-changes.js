#!/usr/bin/env node

// Verify all recent changes in Sanity
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Important: bypass CDN to get fresh data
  apiVersion: '2024-01-01',
})

async function verifyAllChanges() {
  console.log('🔍 Verifying all recent changes in Sanity...\n')
  console.log('=' .repeat(60))

  try {
    // Check Hero Title
    console.log('\n1️⃣  HERO SECTION')
    const hero = await client.fetch(`*[_type == "hero"][0]{
      headline,
      _updatedAt
    }`)
    
    if (hero) {
      console.log(`   Title: "${hero.headline}"`)
      console.log(`   Updated: ${new Date(hero._updatedAt).toLocaleString()}`)
      
      if (hero.headline.includes('Management Excellence')) {
        console.log('   ✅ Hero title is correct')
      } else {
        console.log('   ❌ Hero title needs update')
      }
    }

    // Check Engineering Service
    console.log('\n2️⃣  ENGINEERING SERVICE')
    const services = await client.fetch(`*[_type == "services"][0]{
      services[title == "Engineering"]{
        title,
        features
      },
      _updatedAt
    }`)
    
    if (services && services.services && services.services.length > 0) {
      const engineering = services.services[0]
      console.log(`   Features: ${engineering.features?.length || 0} items`)
      
      if (engineering.features) {
        engineering.features.forEach((feature, i) => {
          console.log(`      ${i + 1}. ${feature}`)
        })
        
        if (engineering.features[0] === 'Construction and Maintenance') {
          console.log('   ✅ Construction and Maintenance is first')
        } else {
          console.log('   ❌ Construction and Maintenance is not first')
        }
      }
      console.log(`   Updated: ${new Date(services._updatedAt).toLocaleString()}`)
    }

    // Check if using CDN
    console.log('\n3️⃣  CONNECTION INFO')
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
    console.log(`   Using CDN: false (direct connection)`)

    console.log('\n' + '='.repeat(60))
    console.log('\n💡 NEXT STEPS:')
    console.log('   1. Clear Next.js cache: rm -rf .next')
    console.log('   2. Restart dev server: npm run dev')
    console.log('   3. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)')
    console.log('   4. Check Sanity Studio: http://localhost:3000/studio')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  verifyAllChanges().catch(console.error)
}

module.exports = { verifyAllChanges }
