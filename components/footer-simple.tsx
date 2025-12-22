import { Suspense } from 'react'
import { getFooterContent } from "@/lib/footer-content-service"
import { ensureInitialContent } from "@/lib/auto-migrate"
import FooterClient from "./footer-client"
import { FooterSkeleton } from './footer-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function FooterWithContent() {
  // Ensure initial content exists
  await ensureInitialContent()
  
  // Fetch content from CMS
  const content = await getFooterContent()
  return <FooterClient content={content} />
}

export default function FooterSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<FooterSkeleton />}>
        <FooterWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}