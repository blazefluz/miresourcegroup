import { Suspense } from 'react'
import { getServicesContent } from '@/lib/services-content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { ServicesClient } from './services-client'
import { ServicesSkeleton } from './services-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function ServicesWithContent() {
  // Ensure initial content exists on first run
  await ensureInitialContent()
  
  const servicesContent = await getServicesContent()
  return <ServicesClient content={servicesContent} />
}

// Services component with proper error handling
export default function ServicesSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}