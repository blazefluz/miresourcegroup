#!/usr/bin/env node

// Upload all missing images to Sanity
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

// Image mappings for different sections
const imageMappings = {
  about: {
    path: 'public/three-factory-workers-safety-hats-discussing-manufacture-plan.jpg',
    description: 'About section - factory workers discussing plans'
  },
  contact: {
    path: 'public/view-male-engineer-work-engineers-day-celebration.jpg',
    description: 'Contact section - engineer at work'
  },
  services: [
    {
      title: 'Engineering & Procurement',
      path: 'public/african-american-engineers-supervise-industrial-automation-system.jpg',
      description: 'Engineers supervising automation system'
    },
    {
      title: 'Procurement Services',
      path: 'public/warehouse-manager-walking-through-large-storage-area-holding-tablet-while-forklift-operating-background.jpg',
      description: 'Warehouse manager with tablet'
    },
    {
      title: 'Supply Chain Management',
      path: 'public/aerial-view-factory-trucks-parked-near-warehouse-daytime.jpg',
      description: 'Aerial view of factory and trucks'
    },
    {
      title: 'Management Services',
      path: 'public/african-american-worker-standing-uniform-wearing-safety-hat-factory.jpg',
      description: 'Worker in safety uniform'
    },
    {
      title: 'Equipment & Facilities',
      path: 'public/engineers-optimizing-automated-factory-systems.jpg',
      description: 'Engineers optimizing factory systems'
    }
  ]
}

async function uploadImage(filePath, description) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`   ⚠️  File not found: ${filePath}`)
      return null
    }

    console.log(`   📤 Uploading: ${path.basename(filePath)}`)
    
    const imageBuffer = fs.readFileSync(filePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(filePath),
      contentType: 'image/jpeg',
    })

    console.log(`   ✅ Uploaded: ${asset._id}`)
    return asset
  } catch (error) {
    console.error(`   ❌ Upload failed: ${error.message}`)
    return null
  }
}

async function updateAboutImage() {
  console.log('\n1️⃣  Uploading About section image...')
  
  const asset = await uploadImage(imageMappings.about.path, imageMappings.about.description)
  if (!asset) return

  try {
    await client
      .patch('about-content')
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()
    
    console.log('   ✅ About image updated successfully!')
  } catch (error) {
    console.error(`   ❌ Failed to update about content: ${error.message}`)
  }
}

async function updateContactImage() {
  console.log('\n2️⃣  Uploading Contact section image...')
  
  const asset = await uploadImage(imageMappings.contact.path, imageMappings.contact.description)
  if (!asset) return

  try {
    await client
      .patch('contact-content')
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()
    
    console.log('   ✅ Contact image updated successfully!')
  } catch (error) {
    console.error(`   ❌ Failed to update contact content: ${error.message}`)
  }
}

async function updateServicesImages() {
  console.log('\n3️⃣  Uploading Services section images...')
  
  try {
    // Get current services content
    const servicesContent = await client.fetch(`*[_type == "services"][0]{
      ...,
      services[]
    }`)

    if (!servicesContent || !servicesContent.services) {
      console.log('   ❌ No services content found')
      return
    }

    // Upload images and update services
    for (const serviceMapping of imageMappings.services) {
      // Find matching service
      const serviceIndex = servicesContent.services.findIndex(
        s => s.title === serviceMapping.title
      )

      if (serviceIndex === -1) {
        console.log(`   ⚠️  Service not found: ${serviceMapping.title}`)
        continue
      }

      console.log(`\n   📝 Processing: ${serviceMapping.title}`)
      const asset = await uploadImage(serviceMapping.path, serviceMapping.description)
      
      if (!asset) continue

      // Update the specific service with the image
      const service = servicesContent.services[serviceIndex]
      service.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      }

      servicesContent.services[serviceIndex] = service
    }

    // Update the entire services document
    await client
      .patch('services-content')
      .set({ services: servicesContent.services })
      .commit()

    console.log('\n   ✅ All service images updated successfully!')
  } catch (error) {
    console.error(`   ❌ Failed to update services: ${error.message}`)
  }
}

async function uploadAllMissingImages() {
  console.log('🚀 Starting image upload process...\n')
  console.log('📋 This will upload images for:')
  console.log('   • About section')
  console.log('   • Contact section')
  console.log('   • Services section (5 services)')
  console.log('')

  try {
    await updateAboutImage()
    await updateContactImage()
    await updateServicesImages()

    console.log('\n🎉 All images uploaded successfully!')
    console.log('💡 You can now view them in the Sanity Studio')
    console.log('   • Local: http://localhost:3000/studio')
    console.log('   • Hosted: https://miresourcesgroup.sanity.studio')
  } catch (error) {
    console.error('\n❌ Upload process failed:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  uploadAllMissingImages().catch(console.error)
}

module.exports = { uploadAllMissingImages }
