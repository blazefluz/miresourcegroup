#!/usr/bin/env node

// Script to update Marine & Logistics Services to Marine Support Services
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateMarineServices() {
  console.log('🔄 Updating Marine Support Services...\n')
  
  try {
    // Step 1: Get Marine & Logistics Services
    console.log('📋 Step 1: Fetching Marine & Logistics Services...')
    const marineService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine & Logistics Services"][0]`
    )
    
    if (!marineService) {
      console.error('❌ Marine & Logistics Services not found')
      return false
    }
    
    console.log(`✅ Found service: ${marineService.title}`)
    
    // Step 2: Update with new content
    console.log('\n📋 Step 2: Updating to Marine Support Services...')
    
    const newTitle = 'Marine Support Services'
    const newTagline = 'Comprehensive marine electronics and logistics solutions'
    const newDescription = `Marine Electronics: Professional marine electronics sales, installation, and maintenance. Our scope of services covers the sales, installation, repairs, maintenance, and support of marine electronic equipment. Our engineers are OEM-certified and trained by service partners, providing services both in port and at sea, ensuring reliable and professional support at all times.

Marine Logistics Services: Comprehensive logistics and transportation solutions. Our logistics services ensure getting the right product to the right customer, in the right quantity, in the right condition, at the right place, at the right time, and at the right cost. We operate the 7 Rs of logistics framework.`
    
    const newFeatures = [
      'Marine Logistics - Offshore supply and maritime transportation services',
      'Fleet Management - Comprehensive vehicle and equipment management',
      'Motor Tanker Vessels - Specialized tanker fleet for petroleum products',
      'VSAT Internet Systems - New hardware installation, repairs, routine maintenance, and internet subscription',
      'GMDSS Systems - New hardware installation, repairs, reprogramming, routine maintenance, subscription, and activation of distress alert services',
      'VDR / SVDR Systems - New hardware installation, repairs, programming of Data Acquisition Units and Capsules',
      'Class-Approved Radio Surveyors - Annual Radio Surveys and VDR Annual Performance Tests on vessels trading throughout West African countries',
      'Navigation Systems - Installation, repairs, and routine maintenance of Radar, Autopilot, ECDIS, Gyrocompass, GPS',
      'Dynamic Positioning Systems - Repairs and routine maintenance',
      'OEM-Certified Engineers - Professional support both in port and at sea'
    ]
    
    const newSubcategories = [
      { name: 'Marine Logistics', order: 1 },
      { name: 'Fleet Management', order: 2 },
      { name: 'Motor Tanker Vessels', order: 3 },
      { name: 'VSAT Internet Systems', order: 4 },
      { name: 'GMDSS Systems', order: 5 },
      { name: 'VDR / SVDR Systems', order: 6 },
      { name: 'Class-Approved Radio Surveyors', order: 7 },
      { name: 'Navigation Systems', order: 8 },
      { name: 'Dynamic Positioning Systems', order: 9 },
      { name: 'OEM-Certified Engineers', order: 10 }
    ]
    
    // Update the service
    await client
      .patch(marineService._id)
      .set({
        title: newTitle,
        tagline: newTagline,
        description: newDescription,
        features: newFeatures,
        subcategories: newSubcategories
      })
      .commit()
    
    console.log('✅ Updated Marine Support Services')
    console.log(`   - New title: "${newTitle}"`)
    console.log(`   - New tagline: "${newTagline}"`)
    console.log(`   - Updated description with Marine Electronics and Marine Logistics sections`)
    console.log(`   - Total features: ${newFeatures.length}`)
    console.log(`   - Total subcategories: ${newSubcategories.length}`)
    
    // Step 3: Verify the update
    console.log('\n📋 Step 3: Verifying update...')
    const updatedService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine Support Services"][0] {
        title,
        tagline,
        "featuresCount": count(features),
        "subcategoriesCount": count(subcategories)
      }`
    )
    
    if (updatedService) {
      console.log('✅ Verification successful')
      console.log(`   - Title: ${updatedService.title}`)
      console.log(`   - Tagline: ${updatedService.tagline}`)
      console.log(`   - Features: ${updatedService.featuresCount}`)
      console.log(`   - Subcategories: ${updatedService.subcategoriesCount}`)
    }
    
    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('🎉 UPDATE COMPLETE!')
    console.log('='.repeat(60))
    console.log('\n📊 Summary:')
    console.log('   ✅ Marine & Logistics Services → Marine Support Services')
    console.log('   ✅ Combined Marine Electronics and Marine Logistics content')
    console.log('   ✅ Updated with 10 key capabilities and features')
    console.log('   ✅ Updated with 10 subcategories')
    console.log('   ✅ Includes OEM-certified engineers and professional support')
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Visit http://localhost:3000/services')
    console.log('   2. Verify "Marine Support Services" title')
    console.log('   3. Check new features appear in the service')
    console.log('   4. Test navigation dropdown shows new subcategories')
    console.log('   5. Verify description includes both Marine Electronics and Marine Logistics')
    
    return true
    
  } catch (error) {
    console.error('\n❌ UPDATE FAILED:', error.message)
    console.error('\nError details:', error)
    return false
  }
}

// Run update
updateMarineServices().then(success => {
  process.exit(success ? 0 : 1)
})
