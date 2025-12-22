import Header from "@/components/header-simple"
import Hero from "@/components/hero-simple"
import About from "@/components/about"
import Services from "@/components/services-simple"
import ValueProposition from "@/components/value-proposition-simple"
import Testimonials from "@/components/testimonials-simple"
import Clients from "@/components/clients-simple"
import Contact from "@/components/contact-simple"
import Footer from "@/components/footer-simple"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <ValueProposition />
      <Testimonials />
      <Clients />
      <Contact />
      <Footer />
    </main>
  )
}
