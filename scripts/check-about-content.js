#!/usr/bin/env node

// Check current about content
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkAboutContent() {
  console.log('🔍 Checking about content...\n')

  try {
    const about = await client.fetch(`*[_type == "about"][0]{
      _id,
      headline,
      description
    }`)
    
    if (!about) {
      console.log('❌ No about content found')
      return
    }

    console.log('About content:')
    console.log(JSON.stringify(about, null, 2))
    
  } catch (error) {
    console.error('❌ Check failed:', error.message)
  }
}

checkAboutContent()
