import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import Testimonials from "@/components/testimonials-simple"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"

export const metadata: Metadata = {
  title: "Testimonials | M.I Resource Services Ltd",
  description: "What our clients say about working with M.I Resource Services Ltd.",
}

export default function TestimonialsPage() {
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="Client Testimonials"
        subtitle="Hear from our satisfied clients about their experience working with us"
        backgroundImage="/engineers-optimizing-automated-factory-systems.jpg"
      />
      <Testimonials />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
