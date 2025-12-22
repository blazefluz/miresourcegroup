require('dotenv').config({ path: '.env.local' })
const { createClient } = require('next-sanity')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function testHeaderContent() {
  console.log('🧪 Testing Header Content Integration...\n')

  try {
    console.log('🔍 Testing header content query...')
    const content = await client.fetch(`
      *[_type == "header" && _id == "header-content"][0] {
        _id,
        brandName,
        navigation,
        ctaButton
      }
    `)

    if (content) {
      console.log('✅ Header content found:')
      console.log(`   ID: ${content._id}`)
      console.log(`   Brand: "${content.brandName.primary} ${content.brandName.secondary}"`)
      console.log(`   Navigation: ${content.navigation.length} items`)
      console.log(`   CTA: "${content.ctaButton.text}" → ${content.ctaButton.url}`)
      
      console.log('\n📋 Navigation items:')
      content.navigation.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.name} → ${item.href}`)
      })

      console.log('\n✅ Schema validation:')
      console.log(`   ✅ brandName: ${content.brandName ? 'Present' : 'Missing'}`)
      console.log(`   ✅ navigation: ${content.navigation ? 'Present' : 'Missing'}`)
      console.log(`   ✅ ctaButton: ${content.ctaButton ? 'Present' : 'Missing'}`)

      console.log('\n🎉 Header content integration test completed successfully!')
    } else {
      console.log('❌ No header content found')
      console.log('💡 Run the migration script: node scripts/migrate-initial-content.js')
    }
  } catch (error) {
    console.error('❌ Header content test failed:', error.message)
    process.exit(1)
  }
}

testHeaderContent()