"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Eye } from "lucide-react"

export function MissionVision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/20 via-transparent to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Our Mission
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Driving Excellence in{" "}
              <span className="text-primary">Oil & Gas Services</span>
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                To apply the best practices and tools in the delivery of our services, 
                support and drive client initiatives to enhance a conducive operating environment.
              </p>
              <p>
                We maintain emergency response capability to react quickly and effectively 
                against deviations, ensuring operational continuity and excellence.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="flex-1 p-4 bg-card rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-1">Port Harcourt</div>
                <div className="text-sm text-muted-foreground">Head Office</div>
              </div>
              <div className="flex-1 p-4 bg-card rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-1">Lagos</div>
                <div className="text-sm text-muted-foreground">Branch Office</div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Our Vision
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Leading Engineering Services in{" "}
              <span className="text-primary">Africa</span>
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                To be the leading engineering and support services provider in Africa, 
                setting industry standards for excellence, innovation, and sustainability.
              </p>
              <p>
                We envision a future where our expertise and dedication contribute 
                significantly to Nigeria's energy sector growth and development.
              </p>
            </div>

            <div className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary">
              <p className="text-foreground font-medium italic">
                "Our staff are our most important asset and we will not compromise 
                our safety standards to achieve other corporate goals."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
