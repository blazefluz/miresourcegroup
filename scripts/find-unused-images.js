#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Get all image files in public directory
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllImages(filePath, fileList)
    } else if (/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(file)) {
      // Store relative path from public directory
      const relativePath = filePath.replace(/^public\//, '')
      fileList.push(relativePath)
    }
  })
  
  return fileList
}

// Check if image is referenced in codebase
function isImageUsed(imagePath) {
  try {
    // Search for the image path in all relevant files
    const result = execSync(
      `grep -r "${imagePath}" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.css" --include="*.scss" . 2>/dev/null || true`,
      { encoding: 'utf-8' }
    )
    
    // Also check without leading slash
    const result2 = execSync(
      `grep -r "/${imagePath}" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.css" --include="*.scss" . 2>/dev/null || true`,
      { encoding: 'utf-8' }
    )
    
    return result.trim().length > 0 || result2.trim().length > 0
  } catch (error) {
    return false
  }
}

console.log('🔍 Finding unused images in public directory...\n')

const publicDir = path.join(process.cwd(), 'public')
const allImages = getAllImages(publicDir)

console.log(`📊 Total images found: ${allImages.length}\n`)

const unusedImages = []
const usedImages = []

allImages.forEach(imagePath => {
  const isUsed = isImageUsed(imagePath)
  
  if (isUsed) {
    usedImages.push(imagePath)
    console.log(`✅ USED: ${imagePath}`)
  } else {
    unusedImages.push(imagePath)
    console.log(`❌ UNUSED: ${imagePath}`)
  }
})

console.log('\n' + '='.repeat(60))
console.log(`\n📈 Summary:`)
console.log(`   Used images: ${usedImages.length}`)
console.log(`   Unused images: ${unusedImages.length}`)

if (unusedImages.length > 0) {
  console.log('\n🗑️  Unused images that can be deleted:')
  unusedImages.forEach(img => console.log(`   - public/${img}`))
  
  // Write to file for reference
  fs.writeFileSync(
    'unused-images.txt',
    unusedImages.map(img => `public/${img}`).join('\n')
  )
  console.log('\n💾 List saved to: unused-images.txt')
}
