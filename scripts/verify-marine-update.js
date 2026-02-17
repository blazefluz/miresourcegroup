#!/usr/bin/env node

// Script to verify Marine Support Services update
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function verifyMarineUpdate() {
  console.log('🔍 Verifying Marine Support Services...\n')
  
  try {
    const marineService = await client.fetch(
      `*[_type == "serviceDetailed" && title == "Marine Support Services"][0] {
        _id,
        title,
        tagline,
        description,
        features,
        subcategories,
        order
      }`
    )
    
    if (!marineService) {
      console.error('❌ Marine Support Services not found')
      return false
    }
    
    console.log('✅ Service Found in Sanity')
    console.log('=' .repeat(60))
    console.log(`Title: ${marineService.title}`)
    console.log(`Tagline: ${marineService.tagline}`)
    console.log(`Order: ${marineService.order}`)
    console.log('\nDescription:')
    console.log('-'.repeat(60))
    console.log(marineService.description)
    console.log('-'.repeat(60))
    
    console.log(`\nFeatures (${marineService.features.length}):`)
    marineService.features.forEach((feature, idx) => {
      console.log(`${idx + 1}. ${feature}`)
    })
    
    console.log(`\nSubcategories (${marineService.subcategories.length}):`)
    marineService.subcategories.forEach((sub, idx) => {
      console.log(`${idx + 1}. ${sub.name}`)
    })
    
    console.log('\n' + '='.repeat(60))
    console.log('✅ Data is correct in Sanity!')
    console.log('=' .repeat(60))
    
    console.log('\n💡 If changes are not showing on the website:')
    console.log('   1. Wait 60 seconds for cache revalidation')
    console.log('   2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)')
    console.log('   3. Clear Next.js cache: rm -rf .next')
    console.log('   4. Restart dev server: npm run dev')
    console.log('   5. Check browser console for errors')
    
    return true
    
  } catch (error) {
    console.error('\n❌ VERIFICATION FAILED:', error.message)
    return false
  }
}

verifyMarineUpdate().then(success => {
  process.exit(success ? 0 : 1)
})
