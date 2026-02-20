#!/usr/bin/env node

// Update footer brand name to have "M.I Resource" as primary (gold)
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateFooterBrand() {
  console.log('🚀 Updating footer brand name...\n')

  try {
    // Fetch existing footer content
    const existingFooter = await client.fetch(`*[_type == "footer"][0]`)
    
    if (!existingFooter) {
      console.error('❌ No footer content found in Sanity')
      process.exit(1)
    }

    console.log('📝 Current brand name:', existingFooter.brandName)
    
    // Update the footer with new brand name
    const result = await client
      .patch(existingFooter._id)
      .set({
        brandName: {
          primary: 'M.I Resource',
          secondary: 'Services Ltd',
        }
      })
      .commit()
    
    console.log('✅ Footer brand name updated successfully!')
    console.log('   New brand name:', result.brandName)
    console.log('\n💡 The footer should now show "M.I Resource" in gold')
    
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
updateFooterBrand()
