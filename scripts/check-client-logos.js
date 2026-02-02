#!/usr/bin/env node

// Check if client logos have been uploaded to Sanity
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkClientLogos() {
  console.log('🔍 Checking client logos in Sanity...\n')

  try {
    const clientsContent = await client.fetch(`*[_type == "clients"][0]{
      ...,
      clientLogos[]{
        ...,
        logo{
          asset->{
            _id,
            url
          }
        }
      }
    }`)

    if (!clientsContent) {
      console.log('❌ No clients content found')
      return
    }

    console.log(`📋 Clients Content ID: ${clientsContent._id}`)
    console.log(`📝 Headline: "${clientsContent.headline}"`)
    console.log(`\n👥 Client Logos (${clientsContent.clientLogos?.length || 0} total):\n`)

    if (!clientsContent.clientLogos || clientsContent.clientLogos.length === 0) {
      console.log('❌ No client logos found')
      return
    }

    clientsContent.clientLogos.forEach((client, index) => {
      const hasLogo = client.logo?.asset?.url
      const status = hasLogo ? '✅' : '❌'
      console.log(`${status} ${index + 1}. ${client.companyName}`)
      if (hasLogo) {
        console.log(`   URL: ${client.logo.asset.url}`)
      } else {
        console.log(`   Missing logo image`)
      }
    })

    const withLogos = clientsContent.clientLogos.filter(c => c.logo?.asset?.url).length
    const withoutLogos = clientsContent.clientLogos.length - withLogos

    console.log(`\n📊 Summary:`)
    console.log(`   With logos: ${withLogos}/${clientsContent.clientLogos.length}`)
    console.log(`   Missing logos: ${withoutLogos}/${clientsContent.clientLogos.length}`)

    if (withoutLogos > 0) {
      console.log('\n💡 Upload missing logos:')
      console.log('   node scripts/upload-client-logos.js')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

if (require.main === module) {
  checkClientLogos().catch(console.error)
}

module.exports = { checkClientLogos }
