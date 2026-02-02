import { HeaderSkeleton } from "@/components/header-skeleton"
import { TestimonialsSkeleton } from "@/components/testimonials-skeleton"
import { FooterSkeleton } from "@/components/footer-skeleton"

export default function TestimonialsLoading() {
  return (
    <main className="min-h-screen">
      <HeaderSkeleton />
      <div className="h-[60vh] min-h-[500px] lg:min-h-[600px] bg-secondary/30 animate-pulse" />
      <TestimonialsSkeleton />
      <FooterSkeleton />
    </main>
  )
}
