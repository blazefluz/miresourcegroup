"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MessageSquare, FileSearch, Cog, CheckCircle, TrendingUp, Headphones } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Initial Consultation",
    description: "Initial discussions aimed at discovering your time constraints and budgetary requirements to provide realistic methods of achieving your project goals."
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Requirements Analysis",
    description: "Comprehensive assessment of project scope, technical specifications, and client objectives to develop tailored solutions."
  },
  {
    icon: Cog,
    number: "03",
    title: "Solution Design",
    description: "Leveraging our multi-disciplinary expertise and strategic alliances to design optimal solutions that meet quality and budget requirements."
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Quality Execution",
    description: "Implementation with strict adherence to ISO 9001 standards, safety protocols, and client specifications using experienced teams and modern equipment."
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Continuous Monitoring",
    description: "Kaizen-style continuous improvement with proactive measures to reduce deviations and ensure timely, effective flow of goods and services."
  },
  {
    icon: Headphones,
    number: "06",
    title: "Ongoing Support",
    description: "24/7 emergency response capability and ongoing support to maintain operational continuity and address any deviations quickly and effectively."
  }
]

export function ServiceApproach() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Methodology
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            A proven, systematic approach to ensure your objectives are met with quality, safety, and efficiency
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-sm">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center p-8 bg-primary/5 rounded-2xl border border-primary/20"
        >
          <h4 className="text-2xl font-bold text-foreground mb-3">
            Ready to Start Your Project?
          </h4>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss how our comprehensive services and proven methodology can support your operations
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Request a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
