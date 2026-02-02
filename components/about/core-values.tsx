"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Users, Lightbulb, Award, Heart, Zap } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Uncompromising commitment to health, safety, and environmental protection in all operations"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Delivering superior quality and exceeding expectations in every project we undertake"
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "Fostering collaboration and partnership with clients, employees, and stakeholders"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing new technologies and creative solutions to solve complex challenges"
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Conducting business with honesty, transparency, and ethical practices"
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Optimizing processes and resources to deliver cost-effective solutions"
  }
]

export function CoreValues() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Values
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            What We <span className="text-primary">Stand For</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            The principles that guide our decisions and define our company culture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 mb-6">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
