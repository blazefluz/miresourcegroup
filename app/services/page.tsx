import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import Services from "@/components/services-simple"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"

export const metadata: Metadata = {
  title: "Our Services | M.I Resource Services Ltd",
  description: "Comprehensive Oil & Gas support services including Engineering, Procurement, Supply Chain Management, and more.",
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive support services for Nigeria's Oil & Gas industry"
        backgroundImage="/view-male-engineer-work-engineers-day-celebration.jpg"
      />
      <Services />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
