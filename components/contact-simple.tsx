import { Suspense } from 'react'
import { getContactContent } from "@/lib/contact-content-service"
import { ensureInitialContent } from "@/lib/auto-migrate"
import ContactClient from "./contact-client"
import { ContactSkeleton } from './contact-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function ContactWithContent() {
  // Ensure initial content exists
  await ensureInitialContent()
  
  // Fetch content from CMS
  const content = await getContactContent()
  return <ContactClient content={content} />
}

export default function ContactSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<ContactSkeleton />}>
        <ContactWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}