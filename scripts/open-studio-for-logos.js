#!/usr/bin/env node

console.log('🎨 Opening Sanity Studio to upload client logos...\n')

console.log('📋 Steps to upload logos:')
console.log('   1. Sanity Studio will open in your browser')
console.log('   2. Navigate to "Clients" in the left sidebar')
console.log('   3. Click on the "Clients" document')
console.log('   4. Scroll to "Client Logos" section')
console.log('   5. For each of the 6 companies, click and upload their logo')
console.log('')
console.log('🏢 Companies to upload logos for:')
console.log('   • Addax Petroleum')
console.log('   • Chevron')
console.log('   • Deltatek Offshore')
console.log('   • ExxonMobil')
console.log('   • Nigeria LNG Limited')
console.log('   • NNPC')
console.log('')
console.log('💡 Tip: Use PNG files with transparent backgrounds for best results')
console.log('')
console.log('🌐 Opening Studio...')
console.log('   Local: http://localhost:3000/studio')
console.log('   Hosted: https://miresourcesgroup.sanity.studio')
console.log('')

// Open the browser
const { exec } = require('child_process')
const url = 'http://localhost:3000/studio'

// Detect OS and open browser
const command = process.platform === 'darwin' ? 'open' : 
                process.platform === 'win32' ? 'start' : 'xdg-open'

exec(`${command} ${url}`, (error) => {
  if (error) {
    console.log('⚠️  Could not automatically open browser')
    console.log(`   Please manually open: ${url}`)
  } else {
    console.log('✅ Browser opened!')
  }
})

console.log('\n📖 For detailed instructions, see: CLIENT_LOGOS_UPLOAD_GUIDE.md')
