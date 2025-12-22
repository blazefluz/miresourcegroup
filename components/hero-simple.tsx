import { Suspense } from 'react'
import { getHeroContent } from '@/lib/content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { HeroClient } from './hero-client'
import { HeroSkeleton } from './hero-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function HeroWithContent() {
  // Ensure initial content exists on first run
  await ensureInitialContent()
  
  const heroContent = await getHeroContent()
  return <HeroClient content={heroContent} />
}

// Hero component with proper error handling
export default function HeroSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}