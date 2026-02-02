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

// Company logo mapping - these would need to be uploaded to Sanity first
// For now, we'll use placeholder references
const logoMapping = {
  'client-1': 'Deltatek Offshore',
  'client-2': 'Nigeria LNG Limited', 
  'client-3': 'NNPC',
  'client-4': 'Addax Petroleum',
  'client-5': 'Chevron',
  'client-6': 'ExxonMobil',
}

async function updateClientLogos() {
  console.log('🔄 Updating client logos...\n')

  try {
    // Fetch current clients content
    const clientsContent = await client.fetch(`*[_type == "clients"][0]`)
    
    if (!clientsContent) {
      console.error('❌ No clients content found')
      return
    }

    console.log(`📋 Current clients content:`)
    console.log(`   Document ID: ${clientsContent._id}`)
    console.log(`   Headline: ${clientsContent.headline}`)
    console.log(`   Client Logos: ${clientsContent.clientLogos?.length || 0}`)
    
    if (!clientsContent.clientLogos || clientsContent.clientLogos.length === 0) {
      console.log('\n⚠️  No client logos found in the document')
      console.log('   The logos array exists but is empty or missing')
      console.log('\n📝 To add client logos:')
      console.log('   1. Go to Sanity Studio: http://localhost:3000/studio')
      console.log('   2. Navigate to "Clients" section')
      console.log('   3. Click "Add Client Logo"')
      console.log('   4. Upload company logos and fill in details')
      console.log('\n   Expected companies:')
      Object.values(logoMapping).forEach((company, index) => {
        console.log(`      ${index + 1}. ${company}`)
      })
      return
    }

    console.log('\n✅ Client logos structure exists')
    console.log('   Logos in database:')
    clientsContent.clientLogos.forEach((logo, index) => {
      console.log(`      ${index + 1}. ${logo.companyName} (${logo.altText})`)
      if (logo.logo?.asset) {
        console.log(`         ✓ Has logo image`)
      } else {
        console.log(`         ✗ Missing logo image`)
      }
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
  }
}

// Run the update
updateClientLogos()
  .then(() => {
    console.log('\n✨ Check complete!')
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
