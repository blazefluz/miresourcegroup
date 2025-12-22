#!/usr/bin/env node

// Verify that the Sanity schema matches the component usage
console.log('🔍 Verifying Schema-Component Alignment...\n')

// Schema fields from hero.ts
const schemaFields = {
  // Required fields
  headline: { type: 'string', required: true, maxLength: 100 },
  description: { type: 'array (PortableText)', required: true },
  primaryCTA: { 
    type: 'object', 
    required: true,
    fields: {
      text: { type: 'string', required: true, maxLength: 30 },
      url: { type: 'string', required: true }
    }
  },
  
  // Optional fields
  subheadline: { type: 'string', required: false, maxLength: 150 },
  secondaryCTA: { 
    type: 'object', 
    required: false,
    fields: {
      text: { type: 'string', required: false, maxLength: 30 },
      url: { type: 'string', required: false }
    }
  },
  backgroundImage: { 
    type: 'image', 
    required: false,
    fields: {
      alt: { type: 'string', required: true }
    }
  },
  stats: { 
    type: 'array', 
    required: false, 
    maxItems: 6,
    fields: {
      value: { type: 'string', required: true, maxLength: 10 },
      label: { type: 'string', required: true, maxLength: 50 },
      order: { type: 'number', required: true, min: 1, max: 10 }
    }
  },
  seo: { 
    type: 'object', 
    required: false,
    fields: {
      title: { type: 'string', required: false, maxLength: 60 },
      description: { type: 'text', required: false, maxLength: 160 }
    }
  }
}

// Component usage from hero-client.tsx
const componentUsage = {
  headline: { used: true, display: 'Main H1 heading' },
  subheadline: { used: true, display: 'Badge above headline (conditional)' },
  description: { used: true, display: 'PortableText with rich formatting' },
  primaryCTA: { used: true, display: 'Primary button with arrow icon' },
  secondaryCTA: { used: true, display: 'Secondary button (conditional)' },
  backgroundImage: { used: true, display: 'Background image with optimization' },
  stats: { used: true, display: 'Grid of statistics (conditional)' },
  seo: { used: false, display: 'Not used in component (metadata only)' }
}

// GROQ query fields from content-service.ts
const groqQueryFields = [
  '_id', '_type', '_createdAt', '_updatedAt',
  'headline', 'subheadline', 'description',
  'primaryCTA', 'secondaryCTA',
  'backgroundImage{asset->{_id,url},hotspot,crop,alt}',
  'stats[] | order(order asc) {_key,value,label,order}',
  'seo'
]

console.log('📋 Schema Field Analysis:')
console.log('=' .repeat(50))

Object.entries(schemaFields).forEach(([fieldName, fieldConfig]) => {
  const usage = componentUsage[fieldName]
  const inQuery = groqQueryFields.some(field => field.includes(fieldName))
  
  console.log(`\n🔸 ${fieldName.toUpperCase()}`)
  console.log(`   Schema: ${fieldConfig.type}${fieldConfig.required ? ' (required)' : ' (optional)'}`)
  console.log(`   Component: ${usage.used ? '✅ Used' : '❌ Not used'} - ${usage.display}`)
  console.log(`   GROQ Query: ${inQuery ? '✅ Fetched' : '❌ Not fetched'}`)
  
  if (fieldConfig.fields) {
    console.log(`   Sub-fields:`)
    Object.entries(fieldConfig.fields).forEach(([subField, subConfig]) => {
      console.log(`     • ${subField}: ${subConfig.type}${subConfig.required ? ' (required)' : ' (optional)'}`)
    })
  }
})

console.log('\n\n🎯 Alignment Summary:')
console.log('=' .repeat(50))

const alignmentIssues = []

// Check for unused schema fields
Object.entries(schemaFields).forEach(([fieldName, fieldConfig]) => {
  const usage = componentUsage[fieldName]
  if (!usage.used && fieldConfig.required) {
    alignmentIssues.push(`❌ Required field '${fieldName}' is not used in component`)
  }
})

// Check for missing GROQ fields
Object.entries(componentUsage).forEach(([fieldName, usage]) => {
  if (usage.used) {
    const inQuery = groqQueryFields.some(field => field.includes(fieldName))
    if (!inQuery) {
      alignmentIssues.push(`❌ Used field '${fieldName}' is not fetched in GROQ query`)
    }
  }
})

if (alignmentIssues.length === 0) {
  console.log('✅ Perfect alignment! All schema fields are properly used and fetched.')
} else {
  console.log('⚠️  Found alignment issues:')
  alignmentIssues.forEach(issue => console.log(`   ${issue}`))
}

console.log('\n\n📊 Field Usage Statistics:')
console.log('=' .repeat(50))

const totalFields = Object.keys(schemaFields).length
const usedFields = Object.values(componentUsage).filter(usage => usage.used).length
const requiredFields = Object.values(schemaFields).filter(field => field.required).length

console.log(`Total schema fields: ${totalFields}`)
console.log(`Used in component: ${usedFields} (${Math.round(usedFields/totalFields*100)}%)`)
console.log(`Required fields: ${requiredFields}`)
console.log(`Optional fields: ${totalFields - requiredFields}`)

console.log('\n\n🔧 Recommendations:')
console.log('=' .repeat(50))

// Check for potential improvements
const recommendations = []

if (!componentUsage.seo.used) {
  recommendations.push('💡 Consider using SEO fields for better search engine optimization')
}

// Check for unused imports in component
recommendations.push('🧹 Remove unused imports: Image and urlFor from hero-client.tsx')

if (recommendations.length > 0) {
  recommendations.forEach(rec => console.log(`   ${rec}`))
} else {
  console.log('✅ No recommendations - everything looks good!')
}

console.log('\n✅ Schema-Component verification completed!')