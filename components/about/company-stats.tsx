"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Users, Award, Globe } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "15+",
    label: "Years of Excellence",
    description: "Serving Nigeria's Oil & Gas industry"
  },
  {
    icon: Users,
    value: "500+",
    label: "Projects Completed",
    description: "Successful project deliveries"
  },
  {
    icon: Award,
    value: "ISO 9001",
    label: "Certified",
    description: "International quality standards"
  },
  {
    icon: Globe,
    value: "50+",
    label: "Industry Partners",
    description: "Strategic alliances worldwide"
  }
]

export function CompanyStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-primary relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Our Track Record
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Numbers that speak to our commitment and expertise
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-6">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-primary-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-primary-foreground/80">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
