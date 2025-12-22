import { Suspense } from 'react'
import { getHeaderContent } from "@/lib/header-content-service"
import { ensureInitialContent } from "@/lib/auto-migrate"
import HeaderClient from "./header-client"
import { HeaderSkeleton } from './header-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function HeaderWithContent() {
  // Ensure initial content exists
  await ensureInitialContent()
  
  // Fetch content from CMS
  const content = await getHeaderContent()
  return <HeaderClient content={content} />
}

export default function HeaderSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<HeaderSkeleton />}>
        <HeaderWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}