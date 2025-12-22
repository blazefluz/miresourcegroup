#!/usr/bin/env node

// Test environment variable loading
console.log('🧪 Testing Environment Variables...\n')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const requiredVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN'
]

console.log('📋 Environment Variables:')
requiredVars.forEach(varName => {
  const value = process.env[varName]
  const status = value ? '✅' : '❌'
  const displayValue = value ? `${value.substring(0, 8)}...` : 'MISSING'
  console.log(`  ${status} ${varName}: ${displayValue}`)
})

console.log('\n🔍 Raw process.env check:')
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)

// Test if variables are accessible in browser context
console.log('\n🌐 Browser-accessible variables (NEXT_PUBLIC_*):')
Object.keys(process.env)
  .filter(key => key.startsWith('NEXT_PUBLIC_'))
  .forEach(key => {
    console.log(`  ${key}: ${process.env[key]}`)
  })

console.log('\n✅ Environment variable test completed!')