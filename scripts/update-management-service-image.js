#!/usr/bin/env node

// Update management services image to african-man-black-suit.jpg
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateManagementServiceImage() {
  console.log('🚀 Updating Management Services image...\n')

  try {
    // Check if image file exists
    const imagePath = path.join(process.cwd(), 'public', 'african-man-black-suit.jpg')
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Image file not found:', imagePath)
      process.exit(1)
    }

    console.log('📁 Found image file')

    // Upload image to Sanity
    console.log('📤 Uploading image to Sanity...')
    const imageBuffer = fs.readFileSync(imagePath)
    const uploadedImage = await client.assets.upload('image', imageBuffer, {
      filename: 'african-man-black-suit.jpg',
    })

    console.log('✅ Image uploaded:', uploadedImage._id)

    // Fetch services content
    const services = await client.fetch(`*[_type == "services"][0]`)
    
    if (!services) {
      console.error('❌ No services content found in Sanity')
      process.exit(1)
    }

    // Find the management services item (usually the third service)
    const updatedServices = services.services.map(service => {
      // Check if this is the management services item
      if (service.title === 'Management Services' || 
          service.title.toLowerCase().includes('management')) {
        return {
          ...service,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
            alt: 'Professional management services',
          }
        }
      }
      return service
    })

    // Update services content
    console.log('📝 Updating services content...')
    await client
      .patch(services._id)
      .set({ services: updatedServices })
      .commit()

    console.log('✅ Management Services image updated successfully!')
    console.log('💡 The image should now be visible on the services page')
    
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
updateManagementServiceImage()
