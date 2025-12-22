import { Suspense } from 'react'
import { getTestimonialsContent } from '@/lib/testimonials-content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { TestimonialsClient } from './testimonials-client'
import { TestimonialsSkeleton } from './testimonials-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function TestimonialsWithContent() {
  // Ensure initial content exists on first run
  await ensureInitialContent()
  
  const testimonialsContent = await getTestimonialsContent()
  return <TestimonialsClient content={testimonialsContent} />
}

// Testimonials component with proper error handling
export default function TestimonialsSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}