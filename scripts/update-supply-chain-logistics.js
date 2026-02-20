#!/usr/bin/env node

// Script to update Supply Chain Management service
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateSupplyChainLogistics() {
  console.log('🔄 Updating Supply Chain and Logistics Management...\n')
  
  try {
    // Step 1: Get Supply Chain Management service
    console.log('📋 Step 1: Fetching Supply Chain Management service...')
    const supplyChainService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Supply Chain Management"][0]`
    )
    
    if (!supplyChainService) {
      console.error('❌ Supply Chain Management service not found')
      return false
    }
    
    console.log(`✅ Found service: ${supplyChainService.title}`)
    
    // Step 2: Get Marine & Logistics Services
    console.log('\n📋 Step 2: Fetching Marine & Logistics Services...')
    const marineLogisticsService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine & Logistics Services"][0]`
    )
    
    if (!marineLogisticsService) {
      console.error('❌ Marine & Logistics Services not found')
      return false
    }
    
    console.log(`✅ Found service: ${marineLogisticsService.title}`)
    
    // Step 3: Update Supply Chain Management
    console.log('\n📋 Step 3: Updating Supply Chain and Logistics Management...')
    
    // New features to add
    const newFeatures = [
      'Transportation Fleet: Toyota Hilux Trucks, Hiace Buses, Self Loader Trucks (8 Tons)',
      'Heavy Haulage: Low Boy Mark Trailers, 20 Tons Dump Trucks',
      'Support Services: 3000 GL Water Tankers, Light Vehicles',
      'Material Distribution & Last Mile Delivery',
      '24/7 Availability with Rapid Response Capability',
      'Nationwide Coverage Across Nigeria'
    ]
    
    // Combine existing features with new ones
    const updatedFeatures = [...supplyChainService.features, ...newFeatures]
    
    // New subcategories to add
    const newSubcategories = [
      { name: 'Transportation Fleet', order: 7 },
      { name: 'Heavy Haulage', order: 8 },
      { name: 'Support Services', order: 9 },
      { name: 'Material Distribution & Last Mile Delivery', order: 10 },
      { name: '24/7 Availability', order: 11 },
      { name: 'Nationwide Coverage', order: 12 }
    ]
    
    // Combine existing subcategories with new ones
    const updatedSubcategories = [...supplyChainService.subcategories, ...newSubcategories]
    
    // Update the service
    await client
      .patch(supplyChainService._id)
      .set({
        title: 'Supply Chain and Logistics Management',
        features: updatedFeatures,
        subcategories: updatedSubcategories
      })
      .commit()
    
    console.log('✅ Updated Supply Chain and Logistics Management')
    console.log(`   - New title: "Supply Chain and Logistics Management"`)
    console.log(`   - Added ${newFeatures.length} new features`)
    console.log(`   - Added ${newSubcategories.length} new subcategories`)
    console.log(`   - Total features: ${updatedFeatures.length}`)
    console.log(`   - Total subcategories: ${updatedSubcategories.length}`)
    
    // Step 4: Remove items from Marine & Logistics Services
    console.log('\n📋 Step 4: Updating Marine & Logistics Services...')
    
    // Remove the transportation-related features
    const featuresToRemove = [
      'Transportation Fleet: Toyota Hilux Trucks, Hiace Buses, Self Loader Trucks (8 Tons)',
      'Heavy Haulage: Low Boy Mark Trailers, 20 Tons Dump Trucks',
      'Support Services: 3000 GL Water Tankers, Light Vehicles',
      'Material Distribution & Last Mile Delivery',
      '24/7 Availability with Rapid Response Capability',
      'Nationwide Coverage Across Nigeria'
    ]
    
    const updatedMarineFeatures = marineLogisticsService.features.filter(
      feature => !featuresToRemove.some(remove => feature.includes(remove.split(':')[0]))
    )
    
    // Remove the transportation-related subcategories
    const subcategoriesToRemove = [
      'Transportation Fleet',
      'Heavy Haulage',
      'Support Services',
      'Material Distribution & Last Mile Delivery',
      '24/7 Availability',
      'Nationwide Coverage'
    ]
    
    const updatedMarineSubcategories = marineLogisticsService.subcategories.filter(
      sub => !subcategoriesToRemove.includes(sub.name)
    )
    
    // Update Marine & Logistics Services
    await client
      .patch(marineLogisticsService._id)
      .set({
        features: updatedMarineFeatures,
        subcategories: updatedMarineSubcategories
      })
      .commit()
    
    console.log('✅ Updated Marine & Logistics Services')
    console.log(`   - Removed transportation-related features`)
    console.log(`   - Removed transportation-related subcategories`)
    console.log(`   - Remaining features: ${updatedMarineFeatures.length}`)
    console.log(`   - Remaining subcategories: ${updatedMarineSubcategories.length}`)
    
    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('🎉 UPDATE COMPLETE!')
    console.log('='.repeat(60))
    console.log('\n📊 Summary:')
    console.log('   ✅ Supply Chain Management → Supply Chain and Logistics Management')
    console.log('   ✅ Added 6 new features to Supply Chain and Logistics Management')
    console.log('   ✅ Added 6 new subcategories to Supply Chain and Logistics Management')
    console.log('   ✅ Removed transportation items from Marine & Logistics Services')
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Visit http://localhost:3000/services')
    console.log('   2. Verify "Supply Chain and Logistics Management" title')
    console.log('   3. Check new features appear in the service')
    console.log('   4. Test navigation dropdown shows new subcategories')
    console.log('   5. Verify Marine & Logistics Services no longer has transportation items')
    
    return true
    
  } catch (error) {
    console.error('\n❌ UPDATE FAILED:', error.message)
    console.error('\nError details:', error)
    return false
  }
}

// Run update
updateSupplyChainLogistics().then(success => {
  process.exit(success ? 0 : 1)
})
