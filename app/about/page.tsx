import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import About from "@/components/about-simple"
import { MissionVision } from "@/components/about/mission-vision"
import { CoreValues } from "@/components/about/core-values"
import { KeyCapabilities } from "@/components/about/key-capabilities"
import { CompanyTimeline } from "@/components/about/company-timeline"
import { CompanyStats } from "@/components/about/company-stats"
import { TeamShowcase } from "@/components/about/team-showcase"
import { CTASection } from "@/components/home/cta-section"
import Footer from "@/components/footer-simple"

export const metadata: Metadata = {
  title: "About Us | M.I Resource Services Ltd",
  description: "Learn about M.I Resource Services Ltd's mission, vision, and commitment to excellence in Nigeria's Oil & Gas industry.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="About Us"
        subtitle="Leading the way in Oil & Gas support services across Nigeria"
        backgroundImage="/panoramic-shot-oil-rigs-sea-with-beautiful-sunset.jpg"
      />
      <About />
      <CompanyStats />
      <MissionVision />
      <KeyCapabilities />
      <CompanyTimeline />
      <CoreValues />
      <TeamShowcase />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
