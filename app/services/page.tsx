import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import { ServiceDetails } from "@/components/services/service-details"
import { WhyChooseUs } from "@/components/services/why-choose-us"
import { ServiceApproach } from "@/components/services/service-approach"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"
import { getServicesDetailed } from "@/lib/services-detailed-content-service"

export const metadata: Metadata = {
  title: "Our Services | M.I Resource Services Ltd",
  description: "Comprehensive Oil & Gas support services including Engineering, Procurement, Supply Chain Management, Logistics, Management Services, and Construction & Maintenance.",
}

export default async function ServicesPage() {
  const services = await getServicesDetailed()
  
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive support services for Nigeria's Oil & Gas industry"
        backgroundImage="/view-male-engineer-work-engineers-day-celebration.jpg"
      />
      <ServiceDetails services={services} />
      <WhyChooseUs />
      <ServiceApproach />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
