"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wrench, Truck, Briefcase, ArrowUpRight } from "lucide-react"

const services = [
  {
    icon: Wrench,
    title: "Engineering & Procurement",
    description:
      "Comprehensive engineering solutions and procurement services for Oil & Gas operations, including equipment sourcing, technical consulting, and project management.",
    features: ["Technical Consulting", "Equipment Sourcing", "Project Management", "Quality Assurance"],
  },
  {
    icon: Truck,
    title: "Supply Chain Management",
    description:
      "End-to-end supply chain solutions ensuring seamless logistics, inventory management, and distribution across Nigeria's energy sector.",
    features: ["Logistics Coordination", "Inventory Management", "Distribution Networks", "Vendor Management"],
  },
  {
    icon: Briefcase,
    title: "Management Services",
    description:
      "Strategic management consulting and support services to optimize operations, enhance efficiency, and drive sustainable growth.",
    features: ["Operations Management", "Strategic Planning", "Compliance Support", "Training & Development"],
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Our Services</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Comprehensive Solutions for the <span className="text-primary">Energy Sector</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We provide a full spectrum of support services tailored to meet the unique demands of the Oil & Gas
            industry.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>

                  <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>

                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
