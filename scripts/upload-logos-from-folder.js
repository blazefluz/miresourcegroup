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

// Logo file mapping
const logoMapping = {
  'client-4': { name: 'Addax Petroleum', file: 'addax-petroleum.svg' },
  'client-5': { name: 'Chevron', file: 'chevron.svg' },
  'client-6': { name: 'ExxonMobil', file: 'exxonmobil.svg' },
  'client-2': { name: 'Nigeria LNG Limited', file: 'nlng.svg' },
  'client-3': { name: 'NNPC', file: 'nnpc.svg' },
  'client-1': { name: 'Deltatek Offshore', file: 'deltatek.svg' }
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

async function uploadLogosFromFolder() {
  console.log('🚀 Uploading client logos from public/logos folder...\n')

  const logosDir = path.join(__dirname, '../public/logos')
  
  // Check if logos directory exists
  if (!fs.existsSync(logosDir)) {
    console.log('❌ Logos directory not found: public/logos')
    console.log('\n📝 Please create the directory and add logo files:')
    console.log('   mkdir -p public/logos')
    console.log('\n   Required files:')
    Object.values(logoMapping).forEach(logo => {
      console.log(`   - ${logo.file} (${logo.name})`)
    })
    return
  }

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
  
  if (skipCount > 0) {
    console.log('\n⚠️  Some logo files were not found.')
    console.log('   Please add the missing files to public/logos/')
  }

  if (successCount > 0) {
    console.log('\n✨ Upload complete! Run the dev server to see the logos.')
  }
}

// Run the upload
uploadLogosFromFolder()
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
