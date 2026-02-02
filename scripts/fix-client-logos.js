require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const clientLogosData = [
  {
    _key: 'client-1',
    companyName: 'Deltatek Offshore',
    altText: 'Deltatek Offshore Logo',
    order: 1,
  },
  {
    _key: 'client-2',
    companyName: 'Nigeria LNG Limited',
    altText: 'Nigeria LNG Limited Logo',
    order: 2,
  },
  {
    _key: 'client-3',
    companyName: 'NNPC',
    altText: 'NNPC Logo',
    order: 3,
  },
  {
    _key: 'client-4',
    companyName: 'Addax Petroleum',
    altText: 'Addax Petroleum Logo',
    order: 4,
  },
  {
    _key: 'client-5',
    companyName: 'Chevron',
    altText: 'Chevron Logo',
    order: 5,
  },
  {
    _key: 'client-6',
    companyName: 'ExxonMobil',
    altText: 'ExxonMobil Logo',
    order: 6,
  },
]

async function fixClientLogos() {
  console.log('🔧 Fixing client logos array...\n')

  try {
    // Fetch current clients content
    const clientsContent = await client.fetch(`*[_type == "clients"][0]`)
    
    if (!clientsContent) {
      console.error('❌ No clients content found')
      return
    }

    console.log(`📋 Current state:`)
    console.log(`   Document ID: ${clientsContent._id}`)
    console.log(`   Headline: ${clientsContent.headline}`)
    console.log(`   Client Logos: ${clientsContent.clientLogos?.length || 0}`)
    
    // Update the document with the logos array
    console.log('\n📝 Updating clients content with logo entries...')
    
    const updatedContent = await client
      .patch(clientsContent._id)
      .set({ clientLogos: clientLogosData })
      .commit()

    console.log('✅ Client logos array updated successfully!')
    console.log(`   Updated ${clientLogosData.length} logo entries`)
    
    console.log('\n📋 Updated logos:')
    clientLogosData.forEach((logo, index) => {
      console.log(`   ${index + 1}. ${logo.companyName}`)
    })

    console.log('\n⚠️  Note: Logo images still need to be uploaded')
    console.log('   To add logo images:')
    console.log('   1. Go to Sanity Studio: http://localhost:3000/studio')
    console.log('   2. Navigate to "Clients" section')
    console.log('   3. Click on each client logo entry')
    console.log('   4. Upload the company logo image')
    console.log('\n   Until images are uploaded, placeholder logos will be shown')

  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
  }
}

// Run the fix
fixClientLogos()
  .then(() => {
    console.log('\n✨ Fix complete!')
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
