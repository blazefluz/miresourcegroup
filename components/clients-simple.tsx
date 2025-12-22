import { Suspense } from 'react'
import { getClientsContent } from '@/lib/clients-content-service'
import { ensureInitialContent } from '@/lib/auto-migrate'
import { ClientsClient } from './clients-client'
import { ClientsSkeleton } from './clients-skeleton'
import { HeroErrorBoundary } from './hero-error-boundary'

// Server component that fetches content from Sanity
async function ClientsWithContent() {
  // Ensure initial content exists on first run
  await ensureInitialContent()
  
  const clientsContent = await getClientsContent()
  return <ClientsClient content={clientsContent} />
}

// Clients component with proper error handling
export default function ClientsSimple() {
  return (
    <HeroErrorBoundary>
      <Suspense fallback={<ClientsSkeleton />}>
        <ClientsWithContent />
      </Suspense>
    </HeroErrorBoundary>
  )
}