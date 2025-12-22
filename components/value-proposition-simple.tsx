import { Suspense } from 'react'
import { getValuePropositionContent } from '@/lib/value-proposition-content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { ValuePropositionClient } from './value-proposition-client'
import { ValuePropositionSkeleton } from './value-proposition-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function ValuePropositionWithContent() {
  // Ensure initial content exists on first run
  await ensureInitialContent()
  
  const valuePropositionContent = await getValuePropositionContent()
  return <ValuePropositionClient content={valuePropositionContent} />
}

// Value Proposition component with proper error handling
export default function ValuePropositionSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<ValuePropositionSkeleton />}>
        <ValuePropositionWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}