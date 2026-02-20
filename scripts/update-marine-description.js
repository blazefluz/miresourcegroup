#!/usr/bin/env node

// Script to update Marine Support Services description formatting
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateMarineDescription() {
  console.log('🔄 Updating Marine Support Services description...\n')
  
  try {
    // Step 1: Get Marine Support Services
    console.log('📋 Step 1: Fetching Marine Support Services...')
    const marineService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine Support Services"][0]`
    )
    
    if (!marineService) {
      console.error('❌ Marine Support Services not found')
      return false
    }
    
    console.log(`✅ Found service: ${marineService.title}`)
    
    // Step 2: Update description with proper formatting
    console.log('\n📋 Step 2: Updating description with bold headers and paragraphs...')
    
    const newDescription = `**Marine Electronics**

Professional marine electronics sales, installation, and maintenance

Our scope of services covers the sales, installation, repairs, maintenance, and support of marine electronic equipment. Our engineers are OEM-certified and trained by service partners, providing services both in port and at sea, ensuring reliable and professional support at all times.


**Marine Logistics Services**

Comprehensive logistics and transportation solutions

Our logistics services ensure getting the right product to the right customer, in the right quantity, in the right condition, at the right place, at the right time, and at the right cost. We operate the 7 Rs of logistics framework.`
    
    // Update the service
    await client
      .patch(marineService._id)
      .set({
        description: newDescription
      })
      .commit()
    
    console.log('✅ Updated Marine Support Services description')
    console.log('   - Added bold headers for Marine Electronics and Marine Logistics Services')
    console.log('   - Separated into distinct paragraphs')
    console.log('   - Improved readability and structure')
    
    // Step 3: Verify the update
    console.log('\n📋 Step 3: Verifying update...')
    const updatedService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine Support Services"][0] {
        title,
        description
      }`
    )
    
    if (updatedService) {
      console.log('✅ Verification successful')
      console.log(`   - Title: ${updatedService.title}`)
      console.log('   - Description updated with proper formatting')
    }
    
    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('🎉 UPDATE COMPLETE!')
    console.log('='.repeat(60))
    console.log('\n📊 Summary:')
    console.log('   ✅ Added **Marine Electronics** as bold header')
    console.log('   ✅ Added **Marine Logistics Services** as bold header')
    console.log('   ✅ Separated content into distinct paragraphs')
    console.log('   ✅ Improved description structure and readability')
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Visit http://localhost:3000/services')
    console.log('   2. Click on Marine Support Services tab')
    console.log('   3. Verify bold headers display correctly')
    console.log('   4. Check paragraph separation')
    
    return true
    
  } catch (error) {
    console.error('\n❌ UPDATE FAILED:', error.message)
    console.error('\nError details:', error)
    return false
  }
}

// Run update
updateMarineDescription().then(success => {
  process.exit(success ? 0 : 1)
})
