#!/usr/bin/env node

// Check what content exists in Sanity
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkContent() {
  console.log('🔍 Checking Sanity content...\n')

  const contentTypes = [
    { type: 'hero', name: 'Hero' },
    { type: 'about', name: 'About' },
    { type: 'services', name: 'Services' },
    { type: 'valueProposition', name: 'Value Proposition' },
    { type: 'testimonials', name: 'Testimonials' },
    { type: 'header', name: 'Header' },
    { type: 'contact', name: 'Contact' },
    { type: 'footer', name: 'Footer' },
    { type: 'clients', name: 'Clients' },
  ]

  const results = []

  for (const { type, name } of contentTypes) {
    try {
      const content = await client.fetch(`*[_type == "${type}"][0]`)
      if (content) {
        results.push({ name, exists: true, id: content._id })
        console.log(`✅ ${name}: Found (${content._id})`)
      } else {
        results.push({ name, exists: false })
        console.log(`❌ ${name}: Missing`)
      }
    } catch (error) {
      results.push({ name, exists: false, error: error.message })
      console.log(`❌ ${name}: Error - ${error.message}`)
    }
  }

  console.log('\n📊 Summary:')
  const existing = results.filter(r => r.exists).length
  const missing = results.filter(r => !r.exists).length
  console.log(`   Existing: ${existing}/${contentTypes.length}`)
  console.log(`   Missing: ${missing}/${contentTypes.length}`)

  if (missing > 0) {
    console.log('\n💡 Run migration to upload missing content:')
    console.log('   node scripts/migrate-initial-content.js')
  }

  return results
}

if (require.main === module) {
  checkContent().catch(console.error)
}

module.exports = { checkContent }
