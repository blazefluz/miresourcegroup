#!/usr/bin/env node

// Check all images in Sanity content
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkAllImages() {
  console.log('🔍 Checking all images in Sanity content...\n')

  try {
    // Check Hero images
    console.log('1️⃣  HERO SECTION')
    const hero = await client.fetch(`*[_type == "hero"][0]{
      ...,
      backgroundImage{asset->{_id, url}},
      stats[]{..., icon{asset->{_id, url}}}
    }`)
    
    if (hero) {
      console.log(`   Background Image: ${hero.backgroundImage?.asset?.url ? '✅ Uploaded' : '❌ Missing'}`)
      if (hero.backgroundImage?.asset?.url) {
        console.log(`   URL: ${hero.backgroundImage.asset.url}`)
      }
    }

    // Check About images
    console.log('\n2️⃣  ABOUT SECTION')
    const about = await client.fetch(`*[_type == "about"][0]{
      ...,
      image{asset->{_id, url}},
      features[]{..., icon{asset->{_id, url}}}
    }`)
    
    if (about) {
      console.log(`   Main Image: ${about.image?.asset?.url ? '✅ Uploaded' : '❌ Missing'}`)
      if (about.image?.asset?.url) {
        console.log(`   URL: ${about.image.asset.url}`)
      }
    }

    // Check Services images
    console.log('\n3️⃣  SERVICES SECTION')
    const services = await client.fetch(`*[_type == "services"][0]{
      ...,
      services[]{
        ...,
        image{asset->{_id, url}}
      }
    }`)
    
    if (services?.services) {
      services.services.forEach((service, index) => {
        const hasImage = service.image?.asset?.url
        console.log(`   ${hasImage ? '✅' : '❌'} ${service.title}: ${hasImage ? 'Has image' : 'No image'}`)
        if (hasImage) {
          console.log(`      URL: ${service.image.asset.url}`)
        }
      })
    }

    // Check Clients logos
    console.log('\n4️⃣  CLIENTS SECTION')
    const clients = await client.fetch(`*[_type == "clients"][0]{
      ...,
      clientLogos[]{
        ...,
        logo{asset->{_id, url}}
      }
    }`)
    
    if (clients?.clientLogos) {
      const withLogos = clients.clientLogos.filter(c => c.logo?.asset?.url).length
      console.log(`   Client Logos: ${withLogos}/${clients.clientLogos.length} uploaded`)
    }

    // Check Testimonials images
    console.log('\n5️⃣  TESTIMONIALS SECTION')
    const testimonials = await client.fetch(`*[_type == "testimonials"][0]{
      ...,
      testimonials[]{
        ...,
        avatar{asset->{_id, url}}
      }
    }`)
    
    if (testimonials?.testimonials) {
      testimonials.testimonials.forEach((testimonial, index) => {
        const hasAvatar = testimonial.avatar?.asset?.url
        console.log(`   ${hasAvatar ? '✅' : '❌'} ${testimonial.author}: ${hasAvatar ? 'Has avatar' : 'No avatar'}`)
      })
    }

    // Check Contact images
    console.log('\n6️⃣  CONTACT SECTION')
    const contact = await client.fetch(`*[_type == "contact"][0]{
      ...,
      image{asset->{_id, url}}
    }`)
    
    if (contact) {
      console.log(`   Main Image: ${contact.image?.asset?.url ? '✅ Uploaded' : '❌ Missing'}`)
    }

    console.log('\n✅ Image check complete!')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

if (require.main === module) {
  checkAllImages().catch(console.error)
}

module.exports = { checkAllImages }
