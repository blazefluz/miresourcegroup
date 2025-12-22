#!/usr/bin/env node

/**
 * Simple script to test Sanity configuration
 * Run with: node scripts/test-sanity-setup.js
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Simple .env.local parser (avoiding dotenv dependency)
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local')
  const env = {}
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim()
        }
      }
    }
  } catch (error) {
    console.log('⚠️  Could not read .env.local file')
  }
  
  return env
}

// Load environment variables
const envVars = loadEnvLocal()
Object.assign(process.env, envVars)

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
}

async function testSanitySetup() {
  console.log('🧪 Testing Sanity CMS Setup...\n')

  // Check environment variables
  console.log('📋 Checking environment variables:')
  const requiredEnvVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ]

  let envVarsOk = true
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar]
    if (value && value !== 'placeholder_project_id' && value !== 'placeholder_api_token') {
      console.log(`  ✅ ${envVar}: ${value.substring(0, 8)}...`)
    } else {
      console.log(`  ❌ ${envVar}: Missing or placeholder value`)
      envVarsOk = false
    }
  })

  if (!envVarsOk) {
    console.log('\n❌ Please update your .env.local file with actual Sanity credentials')
    console.log('📖 See SANITY_SETUP.md for detailed instructions')
    console.log('🔑 See SANITY_TOKEN_SETUP.md for API token setup')
    return
  }

  // Test connection
  console.log('\n🔌 Testing Sanity connection:')
  try {
    const client = createClient(config)
    
    // Test basic query (simpler than project info)
    const testQuery = await client.fetch('*[0]')
    console.log('  ✅ Successfully connected to Sanity')

    // Test hero content query
    console.log('\n📄 Testing hero content query:')
    const heroContent = await client.fetch('*[_type == "hero"][0]')
    if (heroContent) {
      console.log('  ✅ Hero content found:', heroContent.headline || 'No headline')
    } else {
      console.log('  ℹ️  No hero content found (this is normal for new projects)')
      console.log('  💡 Create hero content in the studio at /studio')
    }

    console.log('\n🎉 Sanity setup test completed successfully!')
    console.log('🚀 You can now:')
    console.log('   • Start your Next.js app: npm run dev')
    console.log('   • Access the studio: http://localhost:3000/studio')
    console.log('   • Or run standalone studio: npm run studio')

  } catch (error) {
    console.log('  ❌ Connection failed:', error.message)
    console.log('\n🔧 Troubleshooting tips:')
    
    if (error.message.includes('Unauthorized') || error.message.includes('grant')) {
      console.log('   🔑 TOKEN PERMISSION ISSUE:')
      console.log('   • Your API token needs "Editor" permissions (not "Viewer")')
      console.log('   • Go to https://www.sanity.io/manage → Your Project → API → Tokens')
      console.log('   • Create a new token with "Editor" permissions')
      console.log('   • See SANITY_TOKEN_SETUP.md for detailed instructions')
    } else if (error.message.includes('not found') || error.message.includes('does not exist')) {
      console.log('   📋 PROJECT/DATASET ISSUE:')
      console.log('   • Check your project ID and dataset name')
      console.log('   • Verify your Sanity project exists and is accessible')
    } else {
      console.log('   • Check your project ID and dataset name')
      console.log('   • Verify your API token has the correct permissions')
      console.log('   • Ensure your Sanity project exists and is accessible')
    }
    console.log('   • See SANITY_SETUP.md for detailed setup instructions')
  }
}

testSanitySetup().catch(console.error)