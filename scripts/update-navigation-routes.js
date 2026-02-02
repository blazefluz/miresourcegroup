const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Mapping of old hash-based links to new route-based links
const routeMapping = {
  '#home': '/',
  '#about': '/about',
  '#services': '/services',
  '#testimonials': '/testimonials',
  '#clients': '/clients',
  '#contact': '/contact',
  '#why-us': '/about',
}

async function updateNavigationRoutes() {
  try {
    console.log('🔍 Fetching current header navigation...')
    
    // Fetch current header content
    const headerContent = await client.fetch('*[_type == "header"][0]')
    
    if (!headerContent) {
      console.log('❌ No header content found in CMS')
      console.log('💡 Creating new header with route-based navigation...')
      
      // Create new header with route-based navigation
      const newHeader = {
        _type: 'header',
        _id: 'header-content',
        brandName: {
          primary: 'M.I',
          secondary: 'Resource Services Ltd'
        },
        navigation: [
          { _key: 'nav-1', name: 'Home', href: '/', order: 1 },
          { _key: 'nav-2', name: 'About', href: '/about', order: 2 },
          { _key: 'nav-3', name: 'Services', href: '/services', order: 3 },
          { _key: 'nav-4', name: 'Testimonials', href: '/testimonials', order: 4 },
          { _key: 'nav-5', name: 'Clients', href: '/clients', order: 5 },
          { _key: 'nav-6', name: 'Contact', href: '/contact', order: 6 },
        ],
        ctaButton: {
          text: 'Get Started',
          url: '/contact'
        }
      }
      
      await client.create(newHeader)
      console.log('✅ Created new header with route-based navigation')
      return
    }

    console.log('📋 Current navigation items:')
    headerContent.navigation?.forEach(item => {
      console.log(`  - ${item.name}: ${item.href}`)
    })

    // Update navigation items
    let updated = false
    const updatedNavigation = headerContent.navigation?.map(item => {
      if (routeMapping[item.href]) {
        console.log(`🔄 Updating ${item.name}: ${item.href} → ${routeMapping[item.href]}`)
        updated = true
        return {
          ...item,
          href: routeMapping[item.href]
        }
      }
      return item
    }) || []

    // Update CTA button if it's a hash link
    let ctaButton = headerContent.ctaButton
    if (ctaButton && routeMapping[ctaButton.url]) {
      console.log(`🔄 Updating CTA button: ${ctaButton.url} → ${routeMapping[ctaButton.url]}`)
      ctaButton = {
        ...ctaButton,
        url: routeMapping[ctaButton.url]
      }
      updated = true
    }

    if (!updated) {
      console.log('✅ Navigation already uses route-based links')
      return
    }

    console.log('\n🔄 Updating header in Sanity...')
    
    // Update the header content
    const result = await client
      .patch(headerContent._id)
      .set({ 
        navigation: updatedNavigation,
        ctaButton: ctaButton
      })
      .commit()

    console.log('✅ Successfully updated navigation to route-based links')
    console.log('📝 Updated header content ID:', result._id)
    
    console.log('\n📋 New navigation items:')
    result.navigation?.forEach(item => {
      console.log(`  - ${item.name}: ${item.href}`)
    })

  } catch (error) {
    console.error('❌ Error updating navigation routes:', error)
    console.error('\n💡 Make sure your environment variables are set:')
    console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
    console.error('   - NEXT_PUBLIC_SANITY_DATASET')
    console.error('   - SANITY_API_TOKEN')
  }
}

// Run the migration
console.log('🚀 Starting navigation route migration...\n')
updateNavigationRoutes()
