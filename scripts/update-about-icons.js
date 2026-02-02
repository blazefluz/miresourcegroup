const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

// Better icon mapping for Oil & Gas industry
const iconUpdates = {
  'ISO 9001 Certified': 'badge',           // BadgeCheck - certification
  'Indigenous Company': 'building',        // Building2 - company/local presence
  'Strategic Alliances': 'handshake',      // Handshake - partnerships
  'Turnkey Solutions': 'package',          // Package - complete solutions
  'Heavy Construction Equipment': 'wrench', // Wrench - equipment/tools
  'Transportation Fleet': 'truck',         // Truck - logistics
  'Welding & Fabrication': 'factory',      // Factory - manufacturing
  'Road Construction': 'settings',         // Settings - construction/engineering
  'Professional Organization': 'crown'     // Crown - excellence/leadership
}

async function updateAboutIcons() {
  try {
    console.log('🔍 Fetching current About content...\n')
    
    const aboutDoc = await client.fetch('*[_type == "about"][0]')
    
    if (!aboutDoc) {
      console.log('❌ No About document found')
      return
    }

    console.log('📝 Current features:')
    aboutDoc.features?.forEach((f, i) => {
      console.log(`   ${i + 1}. ${f.title} - Current icon: ${f.icon}`)
    })

    // Update icons
    const updatedFeatures = aboutDoc.features?.map(feature => {
      const newIcon = iconUpdates[feature.title] || feature.icon
      return {
        ...feature,
        icon: newIcon
      }
    })

    console.log('\n🔄 Updating icons...')
    
    await client
      .patch(aboutDoc._id)
      .set({ features: updatedFeatures })
      .commit()

    console.log('\n✅ Icons updated successfully!\n')
    console.log('📝 New features:')
    updatedFeatures?.forEach((f, i) => {
      console.log(`   ${i + 1}. ${f.title} - New icon: ${f.icon}`)
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

updateAboutIcons()
