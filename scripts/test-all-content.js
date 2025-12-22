#!/usr/bin/env node

// Test all content services to ensure CMS integration is working
require('dotenv').config({ path: '.env.local' })

async function testAllContent() {
  console.log('🧪 Testing all content services...\n')

  try {
    // Test Hero Content
    console.log('1. Testing Hero Content Service...')
    const { getHeroContent } = await import('../lib/content-service.ts')
    const heroContent = await getHeroContent()
    console.log(`   ✅ Hero: "${heroContent.headline}"`)
    console.log(`   📊 Stats: ${heroContent.stats?.length || 0} items`)

    // Test About Content
    console.log('\n2. Testing About Content Service...')
    const { getAboutContent } = await import('../lib/about-content-service.ts')
    const aboutContent = await getAboutContent()
    console.log(`   ✅ About: "${aboutContent.headline}"`)
    console.log(`   🎯 Features: ${aboutContent.features?.length || 0} items`)

    // Test Services Content
    console.log('\n3. Testing Services Content Service...')
    const { getServicesContent } = await import('../lib/services-content-service.ts')
    const servicesContent = await getServicesContent()
    console.log(`   ✅ Services: "${servicesContent.headline}"`)
    console.log(`   ⚙️ Services: ${servicesContent.services?.length || 0} items`)

    // Test Value Proposition Content
    console.log('\n4. Testing Value Proposition Content Service...')
    const { getValuePropositionContent } = await import('../lib/value-proposition-content-service.ts')
    const valuePropositionContent = await getValuePropositionContent()
    console.log(`   ✅ Value Prop: "${valuePropositionContent.headline}"`)
    console.log(`   💎 Values: ${valuePropositionContent.values?.length || 0} items`)

    // Test Testimonials Content
    console.log('\n5. Testing Testimonials Content Service...')
    const { getTestimonialsContent } = await import('../lib/testimonials-content-service.ts')
    const testimonialsContent = await getTestimonialsContent()
    console.log(`   ✅ Testimonials: "${testimonialsContent.headline}"`)
    console.log(`   💬 Testimonials: ${testimonialsContent.testimonials?.length || 0} items`)

    // Test Header Content
    console.log('\n6. Testing Header Content Service...')
    const { getHeaderContent } = await import('../lib/header-content-service.ts')
    const headerContent = await getHeaderContent()
    console.log(`   ✅ Header: "${headerContent.brandName.primary} ${headerContent.brandName.secondary}"`)
    console.log(`   🔗 Navigation: ${headerContent.navigation?.length || 0} items`)

    // Test Contact Content
    console.log('\n7. Testing Contact Content Service...')
    const { getContactContent } = await import('../lib/contact-content-service.ts')
    const contactContent = await getContactContent()
    console.log(`   ✅ Contact: "${contactContent.headline}"`)
    console.log(`   📞 Contact Info: ${contactContent.contactInfo?.length || 0} items`)

    // Test Footer Content
    console.log('\n8. Testing Footer Content Service...')
    const { getFooterContent } = await import('../lib/footer-content-service.ts')
    const footerContent = await getFooterContent()
    console.log(`   ✅ Footer: "${footerContent.brandName.primary} ${footerContent.brandName.secondary}"`)
    console.log(`   📱 Social Links: ${footerContent.socialLinks?.length || 0} items`)
    console.log(`   📋 Footer Sections: ${footerContent.footerSections?.length || 0} items`)

    console.log('\n🎉 All content services are working correctly!')
    console.log('✨ All website content is now sourced from Sanity CMS')
    
  } catch (error) {
    console.error('❌ Content service test failed:', error.message)
    process.exit(1)
  }
}

// Run test if called directly
if (require.main === module) {
  testAllContent()
}

module.exports = { testAllContent }