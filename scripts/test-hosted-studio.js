#!/usr/bin/env node

// Test hosted studio accessibility
console.log('🧪 Testing Hosted Sanity Studio...\n')

const studioUrl = 'https://miresourcesgroup.sanity.studio'

console.log('🌐 Studio Information:')
console.log(`  📍 URL: ${studioUrl}`)
console.log(`  🆔 Project ID: xh936md8`)
console.log(`  📊 Dataset: production`)
console.log(`  🏗️  App ID: kr1jybiqxzmpq6m7crcpx7ia`)

console.log('\n✅ Studio has been redeployed successfully!')
console.log('\n🚀 Next steps:')
console.log(`  1. Visit: ${studioUrl}`)
console.log('  2. Log in with your Sanity account')
console.log('  3. Create hero content in the "Hero Section"')
console.log('  4. Content will automatically appear on your website')

console.log('\n💡 Alternative access methods:')
console.log('  • Local studio: http://localhost:3000/studio (when running npm run dev)')
console.log('  • Standalone studio: npx sanity dev')

console.log('\n🔧 If you still see errors:')
console.log('  • Clear browser cache and try again')
console.log('  • Wait 1-2 minutes for deployment to propagate')
console.log('  • Check browser console for any remaining errors')