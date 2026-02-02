import Header from "@/components/header-simple"
import Hero from "@/components/hero-simple"
import ValueProposition from "@/components/value-proposition-simple"
import FeaturedServices from "@/components/home/featured-services"
import Clients from "@/components/clients-simple"
import Testimonials from "@/components/testimonials-simple"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"

export const metadata = {
  title: "M.I Resource Services Ltd | No.1 Oil & Gas Support Services Provider in Nigeria",
  description: "Leading support services provider in Nigeria's Oil & Gas industry - Engineering, Procurement, Supply Chain Management, and Logistics Solutions.",
  openGraph: {
    title: "M.I Resource Services Ltd | Oil & Gas Support Services",
    description: "No.1 Support Services Provider in Nigeria's Oil & Gas Industry",
    images: ["/MIResourcesLogo.png"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProposition />
      <FeaturedServices />
      <Clients />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
