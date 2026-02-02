"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Building2, Handshake, Package, Truck, Wrench } from "lucide-react"

const capabilities = [
  {
    icon: Award,
    title: "ISO 9001 Certified",
    description: "We have adopted international ISO:9001 standards as our standard for quality management and assurance.",
    color: "text-blue-500"
  },
  {
    icon: Building2,
    title: "Indigenous Company",
    description: "Privately owned Nigerian company with deep understanding of local market dynamics.",
    color: "text-green-500"
  },
  {
    icon: Handshake,
    title: "Strategic Alliances",
    description: "Collaborating alliances with specialized companies to deliver comprehensive solutions.",
    color: "text-purple-500"
  },
  {
    icon: Package,
    title: "Turnkey Solutions",
    description: "Complete project management from design to delivery, ensuring execution costs meet budgets.",
    color: "text-orange-500"
  },
  {
    icon: Wrench,
    title: "Heavy Construction Equipment",
    description: "Excavators, CAT 966C Wheel Loaders, and specialized construction machinery for large-scale projects.",
    color: "text-red-500"
  },
  {
    icon: Truck,
    title: "Transportation Fleet",
    description: "Toyota Hilux trucks, Hiace buses, self-loader trucks, and specialized trailers for logistics operations.",
    color: "text-indigo-500"
  }
]

export function KeyCapabilities() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Capabilities
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            What Sets Us <span className="text-primary">Apart</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Combining international standards with local expertise to deliver exceptional results
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon
            
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-8 bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 mb-6">
                      <IconComponent className={`w-7 h-7 ${capability.color} group-hover:text-primary-foreground transition-colors`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
