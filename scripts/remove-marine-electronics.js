#!/usr/bin/env node

// Script to remove Marine Electronics service
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function removeMarineElectronics() {
  console.log('🗑️  Removing Marine Electronics service...\n')
  
  try {
    // Step 1: Find Marine Electronics service
    console.log('📋 Step 1: Finding Marine Electronics service...')
    const marineElectronics = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine Electronics"][0] {
        _id,
        title,
        order
      }`
    )
    
    if (!marineElectronics) {
      console.log('⚠️  Marine Electronics service not found (may already be deleted)')
      return true
    }
    
    console.log(`✅ Found service: ${marineElectronics.title} (Order: ${marineElectronics.order})`)
    
    // Step 2: Delete the service
    console.log('\n📋 Step 2: Deleting Marine Electronics...')
    await client.delete(marineElectronics._id)
    console.log('✅ Marine Electronics service deleted')
    
    // Step 3: Reorder remaining services
    console.log('\n📋 Step 3: Reordering remaining services...')
    const remainingServices = await client.fetch(
      `*[_type == "serviceDetailed" && published == true] | order(order asc) {
        _id,
        title,
        order
      }`
    )
    
    console.log(`Found ${remainingServices.length} remaining services`)
    
    // Update order for services that came after Marine Electronics
    for (let i = 0; i < remainingServices.length; i++) {
      const service = remainingServices[i]
      const newOrder = i + 1
      
      if (service.order !== newOrder) {
        await client
          .patch(service._id)
          .set({ order: newOrder })
          .commit()
        console.log(`✅ Updated ${service.title}: Order ${service.order} → ${newOrder}`)
      } else {
        console.log(`✓ ${service.title}: Order ${newOrder} (unchanged)`)
      }
    }
    
    // Step 4: Verify deletion
    console.log('\n📋 Step 4: Verifying deletion...')
    const verifyDeleted = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine Electronics"][0]`
    )
    
    if (verifyDeleted) {
      console.error('❌ Service still exists!')
      return false
    }
    
    console.log('✅ Verified: Marine Electronics service removed')
    
    // Step 5: Show final service list
    console.log('\n📋 Step 5: Final service list...')
    const finalServices = await client.fetch(
      `*[_type == "serviceDetailed" && published == true] | order(order asc) {
        order,
        title
      }`
    )
    
    console.log('\nRemaining services:')
    finalServices.forEach(service => {
      console.log(`  ${service.order}. ${service.title}`)
    })
    
    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('🎉 REMOVAL COMPLETE!')
    console.log('='.repeat(60))
    console.log('\n📊 Summary:')
    console.log('   ✅ Marine Electronics service deleted')
    console.log('   ✅ Remaining services reordered')
    console.log(`   ✅ Total services: ${finalServices.length}`)
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Clear Next.js cache: rm -rf .next')
    console.log('   2. Restart dev server: npm run dev')
    console.log('   3. Visit http://localhost:3000/services')
    console.log('   4. Verify Marine Electronics is removed')
    console.log('   5. Check navigation dropdown')
    
    return true
    
  } catch (error) {
    console.error('\n❌ REMOVAL FAILED:', error.message)
    console.error('\nError details:', error)
    return false
  }
}

// Run removal
removeMarineElectronics().then(success => {
  process.exit(success ? 0 : 1)
})
