import { Metadata } from "next"
import Header from "@/components/header-simple"
import { PageHero } from "@/components/layouts/page-hero"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import Contact from "@/components/contact-simple"
import { OfficeLocations } from "@/components/contact/office-locations"
import { SocialMediaLinks } from "@/components/contact/social-media-links"
import Footer from "@/components/footer-simple"

export const metadata: Metadata = {
  title: "Contact Us | M.I Resource Services Ltd",
  description: "Get in touch with M.I Resource Services Ltd. We're here to support your Oil & Gas operations. Visit our offices in Lagos and Port Harcourt.",
  openGraph: {
    title: "Contact Us | M.I Resource Services Ltd",
    description: "Get in touch with Nigeria's leading Oil & Gas support services provider",
    images: ["/MIResourcesLogo.png"],
  },
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <Header />
      <PageHero
        title="Contact Us"
        subtitle="Let's discuss how we can support your operations"
        backgroundImage="/oil-rig-industrial-silhouette-dark-moody.jpg"
      />
      <Contact />
      <OfficeLocations />
      <SocialMediaLinks />
      <Footer />
    </PageWrapper>
  )
}
