#!/usr/bin/env node

// Pre-deployment verification script
require('dotenv').config({ path: '.env.local' })
const { execSync } = require('child_process')

console.log('🚀 Pre-Deployment Verification\n')
console.log('=' .repeat(60))

let hasErrors = false

// Check 1: Environment Variables
console.log('\n1️⃣  Checking Environment Variables...')
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN',
  'NEXT_PUBLIC_SANITY_APP_ID',
]

requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✅ ${varName}`)
  } else {
    console.log(`   ❌ ${varName} - MISSING`)
    hasErrors = true
  }
})

if (process.env.NEXT_PUBLIC_SITE_URL) {
  console.log(`   ✅ NEXT_PUBLIC_SITE_URL: ${process.env.NEXT_PUBLIC_SITE_URL}`)
} else {
  console.log(`   ⚠️  NEXT_PUBLIC_SITE_URL - Not set (will use default)`)
}

// Check 2: TypeScript Compilation
console.log('\n2️⃣  Running TypeScript Check...')
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' })
  console.log('   ✅ TypeScript compilation passed')
} catch (error) {
  console.log('   ❌ TypeScript errors found')
  hasErrors = true
}

// Check 3: Build Test
console.log('\n3️⃣  Running Production Build...')
try {
  execSync('npm run build', { stdio: 'pipe' })
  console.log('   ✅ Production build successful')
} catch (error) {
  console.log('   ❌ Build failed')
  console.log('   Run `npm run build` for details')
  hasErrors = true
}

// Check 4: Content Verification
console.log('\n4️⃣  Verifying Sanity Content...')
try {
  const { createClient } = require('@sanity/client')
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
  })

  const contentTypes = ['hero', 'about', 'services', 'valueProposition', 'testimonials', 'clients', 'header', 'contact', 'footer']
  
  Promise.all(
    contentTypes.map(type => client.fetch(`*[_type == "${type}"][0]`))
  ).then(results => {
    const existing = results.filter(r => r !== null).length
    console.log(`   ✅ Content: ${existing}/${contentTypes.length} sections found`)
    
    if (existing < contentTypes.length) {
      console.log(`   ⚠️  ${contentTypes.length - existing} content sections missing`)
    }
  }).catch(error => {
    console.log('   ❌ Failed to verify content:', error.message)
    hasErrors = true
  })
} catch (error) {
  console.log('   ❌ Content verification failed:', error.message)
  hasErrors = true
}

// Summary
setTimeout(() => {
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 VERIFICATION SUMMARY\n')
  
  if (hasErrors) {
    console.log('❌ Pre-deployment checks FAILED')
    console.log('   Please fix the errors above before deploying\n')
    process.exit(1)
  } else {
    console.log('✅ All pre-deployment checks PASSED')
    console.log('   Your application is ready for deployment!\n')
    console.log('🚀 Deploy with: vercel --prod\n')
    process.exit(0)
  }
}, 2000)
