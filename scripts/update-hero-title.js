#!/usr/bin/env node

// Update hero section title
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateHeroTitle() {
  console.log('🔄 Updating hero section title...\n')

  try {
    const newTitle = 'Engineering, Procurement, Supply Chain and Management Excellence'
    
    const result = await client
      .patch('hero-content')
      .set({ headline: newTitle })
      .commit()

    console.log('✅ Hero title updated successfully!')
    console.log(`   New title: "${newTitle}"`)
    console.log(`   Document ID: ${result._id}`)
    console.log(`   Updated at: ${result._updatedAt}`)
    
    console.log('\n💡 Changes will appear on your website after revalidation (1 minute)')
    console.log('   Or restart your dev server to see changes immediately')

  } catch (error) {
    console.error('❌ Failed to update hero title:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  updateHeroTitle().catch(console.error)
}

module.exports = { updateHeroTitle }
