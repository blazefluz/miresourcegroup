#!/usr/bin/env node

// Verify hero section title
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function verifyHeroTitle() {
  console.log('🔍 Verifying hero section title...\n')

  try {
    const hero = await client.fetch(`*[_type == "hero"][0]{
      _id,
      headline,
      subheadline,
      _updatedAt
    }`)

    if (!hero) {
      console.log('❌ No hero content found')
      return
    }

    console.log('✅ Hero Content Found')
    console.log(`   ID: ${hero._id}`)
    console.log(`   Title: "${hero.headline}"`)
    console.log(`   Subtitle: "${hero.subheadline}"`)
    console.log(`   Last Updated: ${new Date(hero._updatedAt).toLocaleString()}`)

  } catch (error) {
    console.error('❌ Failed to verify hero title:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  verifyHeroTitle().catch(console.error)
}

module.exports = { verifyHeroTitle }
