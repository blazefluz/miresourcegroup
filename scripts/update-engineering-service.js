#!/usr/bin/env node

// Update Engineering service to add Construction and Maintenance as first feature
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateEngineeringService() {
  console.log('🔄 Updating Engineering service...\n')

  try {
    // Get current services
    const servicesContent = await client.fetch(`*[_type == "services"][0]{
      _id,
      services[]
    }`)

    if (!servicesContent) {
      console.log('❌ No services content found')
      return
    }

    // Find Engineering service
    const engineeringIndex = servicesContent.services.findIndex(
      s => s.title === 'Engineering'
    )

    if (engineeringIndex === -1) {
      console.log('❌ Engineering service not found')
      return
    }

    // Update Engineering service features
    const updatedServices = [...servicesContent.services]
    const engineeringService = updatedServices[engineeringIndex]

    // Add "Construction and Maintenance" as the first feature
    const updatedFeatures = [
      'Construction and Maintenance',
      ...(engineeringService.features || [])
    ]

    updatedServices[engineeringIndex] = {
      ...engineeringService,
      features: updatedFeatures
    }

    // Remove "Construction and Maintenance" service if it exists as a separate service
    const filteredServices = updatedServices.filter(
      s => s.title !== 'Construction and Maintenance'
    )

    // Update in Sanity
    const result = await client
      .patch('services-content')
      .set({ services: filteredServices })
      .commit()

    console.log('✅ Engineering service updated successfully!')
    console.log(`\n📋 Updated Engineering Features:`)
    filteredServices[engineeringIndex].features.forEach((feature, i) => {
      console.log(`   ${i + 1}. ${feature}`)
    })

    console.log(`\n💡 Changes will appear after revalidation (1 minute)`)

  } catch (error) {
    console.error('❌ Failed to update Engineering service:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  updateEngineeringService().catch(console.error)
}

module.exports = { updateEngineeringService }
