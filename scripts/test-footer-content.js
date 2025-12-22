#!/usr/bin/env node

// Test footer content service
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testFooterContent() {
  try {
    console.log('🧪 Testing footer content service...\n')

    // Test fetching footer content
    const footerContent = await client.fetch(`
      *[_type == "footer"][0] {
        _id,
        _type,
        brandName,
        tagline,
        socialLinks[] | order(order asc) {
          _key,
          platform,
          url,
          order
        },
        footerSections[] | order(order asc) {
          _key,
          title,
          links[] {
            _key,
            name,
            href
          },
          order
        },
        copyright
      }
    `)

    if (!footerContent) {
      console.log('❌ No footer content found')
      return
    }

    console.log('✅ Footer content loaded successfully!')
    console.log('📋 Content structure:')
    console.log('   Brand Name:', footerContent.brandName)
    console.log('   Tagline:', footerContent.tagline)
    console.log('   Social Links:', footerContent.socialLinks?.length || 0)
    console.log('   Footer Sections:', footerContent.footerSections?.length || 0)
    console.log('   Copyright:', footerContent.copyright)
    
    // Verify the additionalText field is removed
    if (footerContent.copyright.additionalText !== undefined) {
      console.log('⚠️  Warning: additionalText field still exists in copyright object')
    } else {
      console.log('✅ additionalText field successfully removed from copyright')
    }

    console.log('\n🎉 Footer content test completed successfully!')

  } catch (error) {
    console.error('❌ Footer content test failed:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
    
    process.exit(1)
  }
}

// Run test if called directly
if (require.main === module) {
  testFooterContent()
}

module.exports = { testFooterContent }