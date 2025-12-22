import { Suspense } from 'react'
import { getAboutContent } from '@/lib/about-content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { AboutClient } from './about-client'
import { AboutSkeleton } from './about-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function AboutWithContent() {
  // Ensure initial content exists on first run
  await ensureInitialContent()
  
  const aboutContent = await getAboutContent()
  return <AboutClient content={aboutContent} />
}

// About component with proper error handling
export default function AboutSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<AboutSkeleton />}>
        <AboutWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}