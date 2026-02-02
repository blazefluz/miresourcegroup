require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Logo URLs mapping - using publicly available logos
const logoUrls = {
  'client-4': {
    name: 'Addax Petroleum',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Addax_Petroleum_logo.svg/1200px-Addax_Petroleum_logo.svg.png',
    filename: 'addax-petroleum.png'
  },
  'client-5': {
    name: 'Chevron',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Chevron_Logo.svg/2560px-Chevron_Logo.svg.png',
    filename: 'chevron.png'
  },
  'client-6': {
    name: 'ExxonMobil',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/ExxonMobil_Logo.svg/2560px-ExxonMobil_Logo.svg.png',
    filename: 'exxonmobil.png'
  },
  'client-2': {
    name: 'Nigeria LNG Limited',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Nigeria_LNG_logo.svg/1200px-Nigeria_LNG_logo.svg.png',
    filename: 'nlng.png'
  },
  'client-3': {
    name: 'NNPC',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Nigerian_National_Petroleum_Corporation_logo.svg/1200px-Nigerian_National_Petroleum_Corporation_logo.svg.png',
    filename: 'nnpc.png'
  },
  'client-1': {
    name: 'Deltatek Offshore',
    // Deltatek doesn't have a public logo, we'll use a placeholder
    url: null,
    filename: 'deltatek.png'
  }
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filepath)
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }
      
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}) // Delete the file if error
      reject(err)
    })
  })
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

async function uploadAllLogos() {
  console.log('🚀 Starting client logos upload...\n')

  const tempDir = path.join(__dirname, '../temp-logos')
  
  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  let successCount = 0
  let skipCount = 0

  for (const [clientKey, logoInfo] of Object.entries(logoUrls)) {
    console.log(`\n📦 Processing: ${logoInfo.name}`)
    
    if (!logoInfo.url) {
      console.log(`   ⏭️  Skipping (no public logo available)`)
      skipCount++
      continue
    }

    try {
      const filepath = path.join(tempDir, logoInfo.filename)
      
      // Download image
      console.log(`   ⬇️  Downloading logo...`)
      await downloadImage(logoInfo.url, filepath)
      console.log(`   ✅ Downloaded`)

      // Upload to Sanity
      console.log(`   ⬆️  Uploading to Sanity...`)
      const asset = await uploadImageToSanity(filepath, logoInfo.filename)
      console.log(`   ✅ Uploaded (Asset ID: ${asset._id})`)

      // Update client logo reference
      console.log(`   🔗 Linking to client entry...`)
      await updateClientLogo(clientKey, asset._id)
      console.log(`   ✅ Linked successfully`)

      // Clean up temp file
      fs.unlinkSync(filepath)
      
      successCount++
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`)
    }
  }

  // Clean up temp directory
  try {
    fs.rmdirSync(tempDir)
  } catch (error) {
    // Ignore if directory is not empty or doesn't exist
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Upload Summary:')
  console.log(`   ✅ Successfully uploaded: ${successCount}`)
  console.log(`   ⏭️  Skipped: ${skipCount}`)
  console.log(`   📝 Total processed: ${Object.keys(logoUrls).length}`)
  
  if (skipCount > 0) {
    console.log('\n⚠️  Note: Some logos were skipped because they are not publicly available.')
    console.log('   You can manually upload these logos in Sanity Studio:')
    console.log('   http://localhost:3000/studio')
  }

  console.log('\n✨ Upload complete!')
}

// Run the upload
uploadAllLogos()
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
