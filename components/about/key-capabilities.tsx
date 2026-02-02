"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Zap, Target, Users, Gauge, Lightbulb } from "lucide-react"

const capabilities = [
  {
    icon: Shield,
    title: "Zero Accident Philosophy",
    description: "All accidents are preventable. We maintain the highest safety standards with comprehensive orientation courses and strict adherence to safety protocols.",
    color: "text-blue-500"
  },
  {
    icon: Zap,
    title: "Emergency Response Ready",
    description: "Maintaining emergency response capability to react quickly and effectively against deviations, ensuring operational continuity.",
    color: "text-amber-500"
  },
  {
    icon: Target,
    title: "7 Rs of Logistics",
    description: "Right product, right customer, right quantity, right condition, right place, right time, right cost - our logistics excellence framework.",
    color: "text-purple-500"
  },
  {
    icon: Users,
    title: "Kaizen Methodology",
    description: "Continuous improvement ideology that proactively enhances supply chain efficiency and reduces deviations to industry minimums.",
    color: "text-green-500"
  },
  {
    icon: Gauge,
    title: "Multi-Disciplinary Expertise",
    description: "Comprehensive engineering resources covering Civil, Mechanical, Fabrication, Structural, Electrical and Instrumentation disciplines.",
    color: "text-red-500"
  },
  {
    icon: Lightbulb,
    title: "Global Standards, Local Insight",
    description: "International best practices combined with deep understanding of Nigerian market dynamics and regulatory compliance.",
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
            Operational Excellence
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Our Competitive <span className="text-primary">Advantages</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Delivering excellence through proven methodologies, safety-first culture, and continuous improvement
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
