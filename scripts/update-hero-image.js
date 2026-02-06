#!/usr/bin/env node

// Update hero section background image
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const fs = require('fs')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateHeroImage() {
  console.log('🔄 Updating hero section background image...\n')

  try {
    const imagePath = 'public/1000401403.jpg'
    
    if (!fs.existsSync(imagePath)) {
      console.log('❌ Image file not found:', imagePath)
      return
    }

    console.log('📤 Uploading image to Sanity...')
    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: '1000401403.jpg',
      contentType: 'image/jpeg',
    })

    console.log('✅ Image uploaded:', asset._id)

    console.log('🔄 Updating hero content...')
    const result = await client
      .patch('hero-content')
      .set({
        backgroundImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()

    console.log('✅ Hero background image updated successfully!')
    console.log(`   Document ID: ${result._id}`)
    console.log(`   Updated at: ${result._updatedAt}`)
    console.log(`   Image URL: ${asset.url}`)
    
    console.log('\n💡 Changes will appear on your website after revalidation (1 minute)')
    console.log('   Or restart your dev server to see changes immediately')

  } catch (error) {
    console.error('❌ Failed to update hero image:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  updateHeroImage().catch(console.error)
}

module.exports = { updateHeroImage }
