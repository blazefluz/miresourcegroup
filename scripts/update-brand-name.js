#!/usr/bin/env node

// Update all "M.I Resource Group" and "M.I Resource Services Limited" to "M.I Resources" in Sanity
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function updateBrandName() {
  console.log('🚀 Updating brand name across all content...\n')

  try {
    // Update Hero content
    console.log('📝 Updating Hero content...')
    const hero = await client.fetch(`*[_type == "hero"][0]`)
    if (hero) {
      const updatedDescription = hero.description.map(block => {
        if (block._type === 'block' && block.children) {
          return {
            ...block,
            children: block.children.map(child => ({
              ...child,
              text: child.text
                .replace(/M\.I Resource Services Limited/g, 'M.I Resources')
                .replace(/M\.I Resource Group/g, 'M.I Resources')
            }))
          }
        }
        return block
      })
      
      await client.patch(hero._id).set({ description: updatedDescription }).commit()
      console.log('✅ Hero content updated')
    }

    // Update About content
    console.log('📝 Updating About content...')
    const about = await client.fetch(`*[_type == "about"][0]`)
    if (about && about.description) {
      const updatedDescription = about.description.map(block => {
        if (block._type === 'block' && block.children) {
          return {
            ...block,
            children: block.children.map(child => ({
              ...child,
              text: child.text
                .replace(/M\.I Resource Services Limited/g, 'M.I Resources')
                .replace(/M\.I Resource Group/g, 'M.I Resources')
            }))
          }
        }
        return block
      })
      
      await client.patch(about._id).set({ description: updatedDescription }).commit()
      console.log('✅ About content updated')
    }

    // Update Value Proposition content
    console.log('📝 Updating Value Proposition content...')
    const valueProp = await client.fetch(`*[_type == "valueProposition"][0]`)
    if (valueProp && valueProp.description) {
      const updatedDescription = valueProp.description.map(block => {
        if (block._type === 'block' && block.children) {
          return {
            ...block,
            children: block.children.map(child => ({
              ...child,
              text: child.text
                .replace(/M\.I Resource Services Limited/g, 'M.I Resources')
                .replace(/M\.I Resource Group/g, 'M.I Resources')
            }))
          }
        }
        return block
      })
      
      await client.patch(valueProp._id).set({ description: updatedDescription }).commit()
      console.log('✅ Value Proposition content updated')
    }

    // Update Contact content
    console.log('📝 Updating Contact content...')
    const contact = await client.fetch(`*[_type == "contact"][0]`)
    if (contact && contact.description) {
      const updatedDescription = contact.description.map(block => {
        if (block._type === 'block' && block.children) {
          return {
            ...block,
            children: block.children.map(child => ({
              ...child,
              text: child.text
                .replace(/M\.I Resource Services Limited/g, 'M.I Resources')
                .replace(/M\.I Resource Group/g, 'M.I Resources')
            }))
          }
        }
        return block
      })
      
      await client.patch(contact._id).set({ description: updatedDescription }).commit()
      console.log('✅ Contact content updated')
    }

    // Update Testimonials
    console.log('📝 Updating Testimonials...')
    const testimonials = await client.fetch(`*[_type == "testimonials"][0]`)
    if (testimonials && testimonials.testimonials) {
      const updatedTestimonials = testimonials.testimonials.map(testimonial => ({
        ...testimonial,
        quote: testimonial.quote
          .replace(/M\.I Resource Services Limited/g, 'M.I Resources')
          .replace(/M\.I Resource Group/g, 'M.I Resources')
      }))
      
      await client.patch(testimonials._id).set({ testimonials: updatedTestimonials }).commit()
      console.log('✅ Testimonials updated')
    }

    console.log('\n🎉 All content updated successfully!')
    console.log('💡 Brand name is now "M.I Resources" across the site')
    
  } catch (error) {
    console.error('❌ Update failed:', error.message)
    
    if (error.statusCode === 401) {
      console.error('   → Check your SANITY_API_TOKEN permissions')
    } else if (error.statusCode === 404) {
      console.error('   → Check your project ID and dataset')
    }
    
    process.exit(1)
  }
}

// Run update
updateBrandName()
