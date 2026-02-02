import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import Clients from "@/components/clients-simple"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"

export const metadata: Metadata = {
  title: "Our Clients | M.I Resource Services Ltd",
  description: "Trusted by leading companies in Nigeria's Oil & Gas industry.",
}

export default function ClientsPage() {
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="Our Clients"
        subtitle="Trusted partners in Nigeria's Oil & Gas industry"
        backgroundImage="/oil-platform-ocean-with-sun-setting-it.jpg"
      />
      <Clients />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
