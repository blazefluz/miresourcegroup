// Auto-migration utility for initial content setup
import { getClient } from './sanity'

let migrationAttempted = false

export async function ensureInitialContent() {
  // Only attempt migration once per app startup
  if (migrationAttempted) return
  migrationAttempted = true

  try {
    const client = getClient(false) // Use published client for migration check
    
    // Check if hero content exists
    const existingHeroContent = await client.fetch(`*[_type == "hero"][0]`)
    
    if (!existingHeroContent) {
      console.log('🚀 Auto-migrating initial hero content...')
      console.log('⚠️ Hero content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Hero content exists, skipping hero migration')
    }

    // Check if about content exists
    const existingAboutContent = await client.fetch(`*[_type == "about"][0]`)
    
    if (!existingAboutContent) {
      console.log('🚀 Auto-migrating initial about content...')
      console.log('⚠️ About content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ About content exists, skipping about migration')
    }

    // Check if services content exists
    const existingServicesContent = await client.fetch(`*[_type == "services"][0]`)
    
    if (!existingServicesContent) {
      console.log('🚀 Auto-migrating initial services content...')
      console.log('⚠️ Services content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Services content exists, skipping services migration')
    }

    // Check if value proposition content exists
    const existingValuePropositionContent = await client.fetch(`*[_type == "valueProposition"][0]`)
    
    if (!existingValuePropositionContent) {
      console.log('🚀 Auto-migrating initial value proposition content...')
      console.log('⚠️ Value proposition content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Value proposition content exists, skipping value proposition migration')
    }

    // Check if testimonials content exists
    const existingTestimonialsContent = await client.fetch(`*[_type == "testimonials"][0]`)
    
    if (!existingTestimonialsContent) {
      console.log('🚀 Auto-migrating initial testimonials content...')
      console.log('⚠️ Testimonials content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Testimonials content exists, skipping testimonials migration')
    }

    // Check if header content exists
    const existingHeaderContent = await client.fetch(`*[_type == "header"][0]`)
    
    if (!existingHeaderContent) {
      console.log('🚀 Auto-migrating initial header content...')
      console.log('⚠️ Header content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Header content exists, skipping header migration')
    }

    // Check if contact content exists
    const existingContactContent = await client.fetch(`*[_type == "contact"][0]`)
    
    if (!existingContactContent) {
      console.log('🚀 Auto-migrating initial contact content...')
      console.log('⚠️ Contact content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Contact content exists, skipping contact migration')
    }

    // Check if footer content exists
    const existingFooterContent = await client.fetch(`*[_type == "footer"][0]`)
    
    if (!existingFooterContent) {
      console.log('🚀 Auto-migrating initial footer content...')
      console.log('⚠️ Footer content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Footer content exists, skipping footer migration')
    }

    // Check if clients content exists
    const existingClientsContent = await client.fetch(`*[_type == "clients"][0]`)
    
    if (!existingClientsContent) {
      console.log('🚀 Auto-migrating initial clients content...')
      console.log('⚠️ Clients content missing - please run: node scripts/migrate-initial-content.js')
    } else {
      console.log('✅ Clients content exists, skipping clients migration')
    }
    
  } catch (error) {
    console.warn('⚠️ Auto-migration failed, will use placeholder content:', (error as Error).message)
  }
}