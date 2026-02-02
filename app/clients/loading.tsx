import { HeaderSkeleton } from "@/components/header-skeleton"
import { ClientsSkeleton } from "@/components/clients-skeleton"
import { FooterSkeleton } from "@/components/footer-skeleton"

export default function ClientsLoading() {
  return (
    <main className="min-h-screen">
      <HeaderSkeleton />
      <div className="h-[60vh] min-h-[500px] lg:min-h-[600px] bg-secondary/30 animate-pulse" />
      <ClientsSkeleton />
      <FooterSkeleton />
    </main>
  )
}
