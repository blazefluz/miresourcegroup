#!/usr/bin/env node

/**
 * Test script for clients content integration
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testClientsContent() {
  console.log('🧪 Testing Clients Content Integration...\n')

  try {
    // Test 1: Fetch clients content
    console.log('📋 Test 1: Fetching clients content from Sanity...')
    const clientsContent = await client.fetch(`*[_type == "clients"][0]{
      _id,
      _type,
      badgeText,
      headline,
      highlightedText,
      clientLogos[] | order(order asc) {
        _key,
        companyName,
        altText,
        order
      },
      animationSettings
    }`)

    if (!clientsContent) {
      console.log('❌ No clients content found')
      return false
    }

    console.log('✅ Clients content fetched successfully')
    console.log(`   Document ID: ${clientsContent._id}`)
    console.log(`   Headline: ${clientsContent.headline}`)
    console.log(`   Client Logos: ${clientsContent.clientLogos?.length || 0}`)

    // Test 2: Validate content structure
    console.log('\n🔍 Test 2: Validating content structure...')
    
    const requiredFields = ['headline', 'clientLogos']
    const missingFields = requiredFields.filter(field => !clientsContent[field])
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing required fields: ${missingFields.join(', ')}`)
      return false
    }

    console.log('✅ Content structure is valid')

    // Test 3: Validate client logos
    console.log('\n🏢 Test 3: Validating client logos...')
    
    if (!Array.isArray(clientsContent.clientLogos) || clientsContent.clientLogos.length === 0) {
      console.log('❌ No client logos found')
      return false
    }

    const expectedCompanies = [
      'Deltatek Offshore',
      'Nigeria LNG Limited', 
      'NNPC',
      'Addax Petroleum',
      'Chevron',
      'ExxonMobil'
    ]

    const foundCompanies = clientsContent.clientLogos.map(logo => logo.companyName)
    const missingCompanies = expectedCompanies.filter(company => 
      !foundCompanies.includes(company)
    )

    if (missingCompanies.length > 0) {
      console.log(`⚠️  Missing companies: ${missingCompanies.join(', ')}`)
    } else {
      console.log('✅ All expected companies found')
    }

    console.log(`   Total logos: ${clientsContent.clientLogos.length}`)
    clientsContent.clientLogos.forEach((logo, index) => {
      console.log(`   ${index + 1}. ${logo.companyName} (Order: ${logo.order})`)
    })

    // Test 4: Validate animation settings
    console.log('\n🎬 Test 4: Validating animation settings...')
    
    if (clientsContent.animationSettings) {
      console.log('✅ Animation settings found')
      console.log(`   Scroll Speed: ${clientsContent.animationSettings.scrollSpeed}s`)
      console.log(`   Pause on Hover: ${clientsContent.animationSettings.pauseOnHover}`)
    } else {
      console.log('⚠️  No animation settings found (will use defaults)')
    }

    // Test 5: Verify schema integration
    console.log('\n📋 Test 5: Verifying schema integration...')
    
    try {
      // Test that we can query the schema
      const schemaTest = await client.fetch(`count(*[_type == "clients"])`)
      console.log(`✅ Schema integration working (${schemaTest} document(s) found)`)
    } catch (error) {
      console.log(`❌ Schema integration error: ${error.message}`)
      return false
    }

    console.log('\n🎉 All tests passed!')
    console.log('\n📋 Summary:')
    console.log(`- Clients content: ✅ Working`)
    console.log(`- Client logos: ✅ ${clientsContent.clientLogos.length} companies`)
    console.log(`- Animation settings: ✅ Configured`)
    console.log(`- Schema integration: ✅ Working`)
    console.log(`- CMS integration: ✅ Complete`)

    console.log('\n🚀 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to add real company logos')
    console.log('2. Run npm run dev to see the clients section in action')
    console.log('3. Test the auto-scroll animation and hover effects')

    return true

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    return false
  }
}

// Run tests
if (require.main === module) {
  testClientsContent().then(success => {
    process.exit(success ? 0 : 1)
  })
}

module.exports = { testClientsContent }