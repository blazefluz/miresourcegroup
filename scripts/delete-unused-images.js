#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Get all image files in public directory
function getAllImages(dir, baseDir = dir, fileList = []) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllImages(filePath, baseDir, fileList)
    } else if (/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(file)) {
      // Store relative path from public directory
      const relativePath = filePath.replace(baseDir + '/', '')
      fileList.push({ full: filePath, relative: relativePath })
    }
  })
  
  return fileList
}

// Check if image is referenced in codebase
function isImageUsed(imageName) {
  try {
    // Search for the image filename in all relevant files
    const result = execSync(
      `grep -r "${imageName}" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.css" --include="*.scss" --include="*.md" . 2>/dev/null || true`,
      { encoding: 'utf-8', cwd: process.cwd() }
    )
    
    return result.trim().length > 0
  } catch (error) {
    return false
  }
}

console.log('🔍 Finding unused images in public directory...\n')

const publicDir = path.join(process.cwd(), 'public')
const allImages = getAllImages(publicDir, publicDir)

console.log(`📊 Total images found: ${allImages.length}\n`)

const unusedImages = []
const usedImages = []

allImages.forEach(({ full, relative }) => {
  const isUsed = isImageUsed(relative)
  
  if (isUsed) {
    usedImages.push({ full, relative })
    console.log(`✅ USED: ${relative}`)
  } else {
    unusedImages.push({ full, relative })
    console.log(`❌ UNUSED: ${relative}`)
  }
})

console.log('\n' + '='.repeat(60))
console.log(`\n📈 Summary:`)
console.log(`   Used images: ${usedImages.length}`)
console.log(`   Unused images: ${unusedImages.length}`)

if (unusedImages.length > 0) {
  console.log('\n🗑️  Deleting unused images...\n')
  
  unusedImages.forEach(({ full, relative }) => {
    try {
      fs.unlinkSync(full)
      console.log(`   ✓ Deleted: ${relative}`)
    } catch (error) {
      console.log(`   ✗ Failed to delete: ${relative} - ${error.message}`)
    }
  })
  
  console.log('\n✅ Cleanup complete!')
} else {
  console.log('\n✨ No unused images found!')
}
