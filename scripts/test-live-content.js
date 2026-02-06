#!/usr/bin/env node

// Test what content the live site is actually fetching
const fetch = require('node-fetch')

async function testLiveContent() {
  console.log('🔍 Testing live content from dev server...\n')
  console.log('=' .repeat(60))

  try {
    // Test homepage
    console.log('\n1️⃣  Testing Homepage (http://localhost:3000)')
    const homeResponse = await fetch('http://localhost:3000')
    const homeHtml = await homeResponse.text()
    
    // Check for hero title
    if (homeHtml.includes('Management Excellence')) {
      console.log('   ✅ Hero title found: "...Management Excellence"')
    } else if (homeHtml.includes('Supply Chain Excellence')) {
      console.log('   ❌ Old hero title still showing')
    } else {
      console.log('   ⚠️  Hero title not found in HTML')
    }

    // Check for Construction and Maintenance
    if (homeHtml.includes('Construction and Maintenance')) {
      console.log('   ✅ "Construction and Maintenance" found')
    } else {
      console.log('   ❌ "Construction and Maintenance" not found')
    }

    // Test services page
    console.log('\n2️⃣  Testing Services Page (http://localhost:3000/services)')
    const servicesResponse = await fetch('http://localhost:3000/services')
    const servicesHtml = await servicesResponse.text()
    
    if (servicesHtml.includes('Construction and Maintenance')) {
      console.log('   ✅ "Construction and Maintenance" found on services page')
    } else {
      console.log('   ❌ "Construction and Maintenance" not found on services page')
    }

    console.log('\n' + '='.repeat(60))
    console.log('\n💡 If changes are not showing:')
    console.log('   1. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)')
    console.log('   2. Clear browser cache')
    console.log('   3. Try incognito/private window')
    console.log('   4. Check: http://localhost:3000')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.log('\n💡 Make sure dev server is running: npm run dev')
  }
}

// Wait a bit for server to be ready
setTimeout(() => {
  testLiveContent().catch(console.error)
}, 2000)
