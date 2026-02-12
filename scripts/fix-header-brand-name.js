#!/usr/bin/env node

// Fix header brand name to "M.I Resource Services Ltd"
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function fixHeaderBrandName() {
  console.log('🚀 Fixing header brand name...\n')

  try {
    // Fetch existing header content
    const existingHeader = await client.fetch(`*[_type == "header"][0]`)
    
    if (!existingHeader) {
      console.error('❌ No header content found in Sanity')
      process.exit(1)
    }

    console.log('📝 Current brand name:', existingHeader.brandName)
    
    // Update the header with corrected brand name
    const result = await client
      .patch(existingHeader._id)
      .set({
        brandName: {
          primary: 'M.I Resource',
          secondary: 'Services Ltd',
        }
      })
      .commit()
    
    console.log('✅ Header brand name updated successfully!')
    console.log('   New brand name:', result.brandName)
    console.log('\n💡 The header should now show "M.I Resource Services Ltd"')
    
  } catch (error) {
    console.error('❌ Update failed:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
    
    process.exit(1)
  }
}

// Run update
fixHeaderBrandName()
