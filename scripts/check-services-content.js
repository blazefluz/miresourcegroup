#!/usr/bin/env node

// Check current services content
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkServicesContent() {
  console.log('🔍 Checking services content...\n')

  try {
    const services = await client.fetch(`*[_type == "services"][0]{
      _id,
      services[]{
        _key,
        title,
        description,
        image{
          asset->{
            _id,
            url
          },
          alt
        }
      }
    }`)
    
    if (!services) {
      console.log('❌ No services content found')
      return
    }

    console.log('Services content:')
    console.log(JSON.stringify(services, null, 2))
    
  } catch (error) {
    console.error('❌ Check failed:', error.message)
  }
}

checkServicesContent()
