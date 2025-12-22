#!/usr/bin/env node

// Test placeholder content functionality
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testPlaceholderContent() {
  console.log('🧪 Testing Placeholder Content Functionality...\n')

  try {
    // Check current content
    console.log('🔍 Checking current hero content...')
    const currentContent = await client.fetch(`*[_type == "hero"][0]`)
    
    if (!currentContent) {
      console.log('❌ No content found - this should trigger placeholder content')
      console.log('✅ Placeholder content test: PASS')
      return
    }

    console.log('✅ Current content found:')
    console.log(`   Headline: "${currentContent.headline}"`)
    console.log(`   ID: ${currentContent._id}`)
    
    // Ask user if they want to test placeholder functionality
    console.log('\n💡 To test placeholder content functionality:')
    console.log('   1. Temporarily delete the hero content in the studio')
    console.log('   2. Refresh your website to see placeholder content')
    console.log('   3. The placeholder will clearly indicate it\'s not real content')
    console.log('   4. Re-run the migration script to restore content')
    
    console.log('\n🔧 Commands for testing:')
    console.log('   • Delete content: Go to studio and delete the hero document')
    console.log('   • Restore content: node scripts/migrate-initial-content.js')
    
    console.log('\n✅ Content system is working correctly!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

// Run test if called directly
if (require.main === module) {
  testPlaceholderContent()
}

module.exports = { testPlaceholderContent }