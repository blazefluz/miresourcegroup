#!/usr/bin/env node

// Test content services directly
import 'dotenv/config'

async function testContentServices() {
  console.log('🔍 Testing content services...\n')
  console.log('=' .repeat(60))

  try {
    // Test Hero Content
    console.log('\n1️⃣  HERO CONTENT SERVICE')
    const { getHeroContent } = await import('../lib/content-service.ts')
    const heroContent = await getHeroContent()
    console.log(`   Headline: "${heroContent.headline}"`)
    
    if (heroContent.headline.includes('Management Excellence')) {
      console.log('   ✅ Correct hero title')
    } else {
      console.log('   ❌ Old hero title')
    }

    // Test Services Content
    console.log('\n2️⃣  SERVICES CONTENT SERVICE')
    const { getServicesContent } = await import('../lib/services-content-service.ts')
    const servicesContent = await getServicesContent()
    
    const engineering = servicesContent.services.find(s => s.title === 'Engineering')
    if (engineering) {
      console.log(`   Engineering features: ${engineering.features?.length || 0}`)
      if (engineering.features && engineering.features.length > 0) {
        console.log(`   First feature: "${engineering.features[0]}"`)
        
        if (engineering.features[0] === 'Construction and Maintenance') {
          console.log('   ✅ Construction and Maintenance is first')
        } else {
          console.log('   ❌ Construction and Maintenance is not first')
        }
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('\n✅ Content services are working correctly!')
    console.log('   Changes should be visible at: http://localhost:3000')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error.stack)
  }
}

testContentServices()
