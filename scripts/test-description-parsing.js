#!/usr/bin/env node

const description = `**Marine Electronics**

Professional marine electronics sales, installation, and maintenance

Our scope of services covers the sales, installation, repairs, maintenance, and support of marine electronic equipment. Our engineers are OEM-certified and trained by service partners, providing services both in port and at sea, ensuring reliable and professional support at all times.


**Marine Logistics Services**

Comprehensive logistics and transportation solutions

Our logistics services ensure getting the right product to the right customer, in the right quantity, in the right condition, at the right place, at the right time, and at the right cost. We operate the 7 Rs of logistics framework.`

console.log('Testing description parsing...\n')
console.log('Original description:')
console.log('='.repeat(60))
console.log(description)
console.log('='.repeat(60))

console.log('\n\nSplit by \\n\\n:')
console.log('='.repeat(60))
const paragraphs = description.split('\n\n')
paragraphs.forEach((para, idx) => {
  console.log(`\nParagraph ${idx}:`)
  console.log(`Length: ${para.length}`)
  console.log(`Starts with **: ${para.startsWith('**')}`)
  console.log(`Content: "${para}"`)
  
  if (para.startsWith('**') && para.includes('**', 2)) {
    const endBold = para.indexOf('**', 2)
    const boldText = para.substring(2, endBold)
    const restText = para.substring(endBold + 2).trim()
    console.log(`  -> Bold text: "${boldText}"`)
    console.log(`  -> Rest text: "${restText}"`)
  }
})
