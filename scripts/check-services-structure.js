#!/usr/bin/env node

// Check current services structure
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkServicesStructure() {
  console.log('🔍 Checking current services structure...\n')

  try {
    const services = await client.fetch(`*[_type == "services"][0]{
      _id,
      headline,
      services[]{
        _key,
        title,
        description,
        features,
        order
      }
    }`)

    if (!services) {
      console.log('❌ No services content found')
      return
    }

    console.log('📋 Current Services:\n')
    services.services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title} (order: ${service.order})`)
      console.log(`   Features: ${service.features?.length || 0} items`)
      if (service.features && service.features.length > 0) {
        service.features.forEach((feature, i) => {
          console.log(`      ${i + 1}. ${feature}`)
        })
      }
      console.log('')
    })

  } catch (error) {
    console.error('❌ Failed to check services:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  checkServicesStructure().catch(console.error)
}

module.exports = { checkServicesStructure }
