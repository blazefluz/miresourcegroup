#!/usr/bin/env node

// Update about second paragraph to add "tailor-made"
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateAboutSecondParagraph() {
  console.log('🚀 Updating about second paragraph...\n')

  try {
    const about = await client.fetch(`*[_type == "about"][0]`)
    
    if (!about) {
      console.error('❌ No about content found in Sanity')
      process.exit(1)
    }

    console.log('📝 Current description (second paragraph):')
    console.log(about.description[1].children[0].text)
    
    // Update the second paragraph to add "tailor-made"
    const updatedDescription = about.description.map((block, index) => {
      if (index === 1 && block.children && block.children[0]) {
        return {
          ...block,
          children: [{
            ...block.children[0],
            text: block.children[0].text.replace(
              'offering fully integrated solutions',
              'offering fully integrated tailor-made solutions'
            )
          }]
        }
      }
      return block
    })
    
    await client
      .patch(about._id)
      .set({ description: updatedDescription })
      .commit()
    
    console.log('\n✅ About description updated successfully!')
    console.log('   Updated text now includes "tailor-made solutions"')
    
  } catch (error) {
    console.error('❌ Update failed:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
    
    process.exit(1)
  }
}

// Run update
updateAboutSecondParagraph()
