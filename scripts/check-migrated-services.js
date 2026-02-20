#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkServices() {
  console.log('🔍 Checking migrated services...\n')
  
  try {
    const services = await client.fetch(`*[_type == "serviceDetailed"] | order(order asc) {
      _id,
      title,
      order,
      published,
      "featuresCount": count(features),
      "subcategoriesCount": count(subcategories)
    }`)
    
    console.log(`📊 Total services found: ${services.length}\n`)
    
    services.forEach(service => {
      console.log(`${service.order}. ${service.title}`)
      console.log(`   ID: ${service._id}`)
      console.log(`   Features: ${service.featuresCount}`)
      console.log(`   Subcategories: ${service.subcategoriesCount}`)
      console.log(`   Published: ${service.published ? '✅' : '❌'}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Check failed:', error.message)
  }
}

checkServices()
