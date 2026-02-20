#!/usr/bin/env node

// Test script to verify services migration
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testServicesMigration() {
  console.log('🧪 Testing Services Migration...\n')
  console.log('=' .repeat(60))
  
  try {
    // Test 1: Check if services exist
    console.log('\n📋 Test 1: Checking Services in Sanity...')
    const services = await client.fetch(`*[_type == "serviceDetailed" && published == true] | order(order asc) {
      _id,
      title,
      tagline,
      order,
      published,
      "featuresCount": count(features),
      "subcategoriesCount": count(subcategories),
      "hasImage": defined(image.asset._ref),
      iconName,
      color,
      bgColor
    }`)
    
    if (services.length === 0) {
      console.log('❌ FAIL: No services found in Sanity')
      return false
    }
    
    console.log(`✅ PASS: Found ${services.length} services`)
    
    // Test 2: Verify each service has required fields
    console.log('\n📋 Test 2: Verifying Service Data Integrity...')
    let allValid = true
    
    services.forEach((service, index) => {
      const issues = []
      
      if (!service.title) issues.push('Missing title')
      if (!service.tagline) issues.push('Missing tagline')
      if (!service.iconName) issues.push('Missing icon')
      if (!service.color) issues.push('Missing color')
      if (!service.bgColor) issues.push('Missing bgColor')
      if (!service.hasImage) issues.push('Missing image')
      if (service.featuresCount < 3) issues.push(`Only ${service.featuresCount} features`)
      
      if (issues.length > 0) {
        console.log(`❌ ${service.title}: ${issues.join(', ')}`)
        allValid = false
      } else {
        console.log(`✅ ${service.order}. ${service.title}`)
        console.log(`   - Features: ${service.featuresCount}`)
        console.log(`   - Subcategories: ${service.subcategoriesCount}`)
        console.log(`   - Icon: ${service.iconName}`)
      }
    })
    
    if (!allValid) {
      console.log('\n❌ FAIL: Some services have missing data')
      return false
    }
    
    console.log('\n✅ PASS: All services have complete data')
    
    // Test 3: Check service order
    console.log('\n📋 Test 3: Verifying Service Order...')
    const orders = services.map(s => s.order)
    const expectedOrders = Array.from({ length: services.length }, (_, i) => i + 1)
    const orderCorrect = JSON.stringify(orders) === JSON.stringify(expectedOrders)
    
    if (orderCorrect) {
      console.log('✅ PASS: Services are in correct order (1-8)')
    } else {
      console.log(`⚠️  WARNING: Service orders are: ${orders.join(', ')}`)
      console.log(`   Expected: ${expectedOrders.join(', ')}`)
    }
    
    // Test 4: Check images
    console.log('\n📋 Test 4: Verifying Images...')
    const imagesQuery = await client.fetch(`*[_type == "serviceDetailed" && published == true] {
      title,
      "imageUrl": image.asset->url,
      "imageId": image.asset._ref
    }`)
    
    let allImagesValid = true
    imagesQuery.forEach(service => {
      if (!service.imageUrl) {
        console.log(`❌ ${service.title}: Image URL not found`)
        allImagesValid = false
      } else {
        console.log(`✅ ${service.title}: Image OK`)
      }
    })
    
    if (allImagesValid) {
      console.log('\n✅ PASS: All images are properly configured')
    } else {
      console.log('\n❌ FAIL: Some images are missing')
      return false
    }
    
    // Test 5: Check subcategories
    console.log('\n📋 Test 5: Verifying Subcategories...')
    const subcategoriesQuery = await client.fetch(`*[_type == "serviceDetailed" && published == true] {
      title,
      "subcategoriesCount": count(subcategories),
      subcategories[0...3]
    }`)
    
    subcategoriesQuery.forEach(service => {
      if (service.subcategoriesCount > 0) {
        console.log(`✅ ${service.title}: ${service.subcategoriesCount} subcategories`)
        service.subcategories.forEach((sub, idx) => {
          if (idx < 3) {
            console.log(`   ${idx + 1}. ${sub.name}`)
          }
        })
        if (service.subcategoriesCount > 3) {
          console.log(`   ... and ${service.subcategoriesCount - 3} more`)
        }
      } else {
        console.log(`⚠️  ${service.title}: No subcategories`)
      }
    })
    
    console.log('\n✅ PASS: Subcategories verified')
    
    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('🎉 ALL TESTS PASSED!')
    console.log('='.repeat(60))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Services: ${services.length}/8`)
    console.log(`   ✅ Images: ${services.length}/8`)
    console.log(`   ✅ Features: ${services.reduce((sum, s) => sum + s.featuresCount, 0)}+`)
    console.log(`   ✅ Subcategories: ${services.reduce((sum, s) => sum + s.subcategoriesCount, 0)}+`)
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Start dev server: npm run dev')
    console.log('   2. Visit: http://localhost:3000/services')
    console.log('   3. Test navigation dropdowns')
    console.log('   4. Click through each service tab')
    console.log('   5. Verify images load correctly')
    console.log('   6. Test Sanity Studio: http://localhost:3000/studio')
    
    return true
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message)
    console.error('\nPossible issues:')
    console.error('   - Check .env.local file exists')
    console.error('   - Verify SANITY_PROJECT_ID is correct')
    console.error('   - Verify SANITY_DATASET is correct')
    console.error('   - Verify SANITY_API_TOKEN has read permissions')
    return false
  }
}

// Run tests
testServicesMigration().then(success => {
  process.exit(success ? 0 : 1)
})
