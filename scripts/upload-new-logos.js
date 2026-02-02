require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Logo file mapping - updated with new JPG files
const logoMapping = {
  'client-4': { name: 'Addax Petroleum', file: 'addax.jpg' },
  'client-5': { name: 'Chevron', file: 'chevron.jpg' },
  'client-6': { name: 'ExxonMobil', file: 'exxon.jpg' },
  'client-2': { name: 'Nigeria LNG Limited', file: 'nlng.jpg' },
  'client-3': { name: 'NNPC', file: 'nnpc.jpg' },
  'client-1': { name: 'Deltatek Offshore', file: 'i1.jpg' } // Assuming i1.jpg is Deltatek
}

// Upload image to Sanity
async function uploadImageToSanity(filepath, filename) {
  try {
    const imageBuffer = fs.readFileSync(filepath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    })
    return asset
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error.message)
    throw error
  }
}

// Update client logo with image reference
async function updateClientLogo(clientKey, imageAssetId) {
  try {
    const clientsContent = await client.fetch(`*[_type == "clients"][0]`)
    
    if (!clientsContent) {
      throw new Error('No clients content found')
    }

    // Find and update the specific logo
    const updatedLogos = clientsContent.clientLogos.map(logo => {
      if (logo._key === clientKey) {
        return {
          ...logo,
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAssetId
            }
          }
        }
      }
      return logo
    })

    // Update the document
    await client
      .patch(clientsContent._id)
      .set({ clientLogos: updatedLogos })
      .commit()

    return true
  } catch (error) {
    console.error(`Error updating client logo ${clientKey}:`, error.message)
    throw error
  }
}

async function uploadNewLogos() {
  console.log('🚀 Uploading new JPG logos to Sanity...\n')

  const logosDir = path.join(__dirname, '../public/logos')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const [clientKey, logoInfo] of Object.entries(logoMapping)) {
    console.log(`\n📦 Processing: ${logoInfo.name}`)
    
    const filepath = path.join(logosDir, logoInfo.file)
    
    if (!fs.existsSync(filepath)) {
      console.log(`   ⏭️  Skipping (file not found: ${logoInfo.file})`)
      skipCount++
      continue
    }

    try {
      // Upload to Sanity
      console.log(`   ⬆️  Uploading to Sanity...`)
      const asset = await uploadImageToSanity(filepath, logoInfo.file)
      console.log(`   ✅ Uploaded (Asset ID: ${asset._id})`)

      // Update client logo reference
      console.log(`   🔗 Linking to client entry...`)
      await updateClientLogo(clientKey, asset._id)
      console.log(`   ✅ Linked successfully`)
      
      successCount++
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Upload Summary:')
  console.log(`   ✅ Successfully uploaded: ${successCount}`)
  console.log(`   ⏭️  Skipped: ${skipCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📝 Total processed: ${Object.keys(logoMapping).length}`)

  if (successCount > 0) {
    console.log('\n✨ Upload complete! The new logos are now live in Sanity.')
    console.log('   Run npm run dev to see the updated logos on the website.')
  }
}

// Run the upload
uploadNewLogos()
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
