import { Suspense } from 'react'
import { getServicesContent } from '@/lib/services-content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { FeaturedServicesClient } from './featured-services-client'
import { ServicesSkeleton } from '../services-skeleton'
import { HeroErrorBoundary } from '../hero-error-boundary'

// Server component that fetches content from Sanity
async function FeaturedServicesWithContent() {
  // Ensure initial content exists
  await ensureInitialContent()
  
  const servicesContent = await getServicesContent()
  return <FeaturedServicesClient content={servicesContent} />
}

export default function FeaturedServices() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<ServicesSkeleton />}>
        <FeaturedServicesWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}
