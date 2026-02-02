import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import CaseStudies from "@/components/case-studies-simple"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"

export const metadata: Metadata = {
  title: "Case Studies | M.I Resource Services Ltd",
  description: "Explore our successful projects and client success stories in Nigeria's Oil & Gas industry.",
}

export default function CaseStudiesPage() {
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="Case Studies"
        subtitle="Real-world success stories from our clients across Nigeria's Oil & Gas industry"
        backgroundImage="/engineers-optimizing-automated-factory-systems.jpg"
      />
      <CaseStudies />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
