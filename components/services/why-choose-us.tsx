"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Users, Globe, Zap, Shield, Target } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Turnkey Capability",
    description: "All Construction and Engineering services under one roof, offering complete turnkey solutions or customized service packages tailored to your needs."
  },
  {
    icon: Users,
    title: "Strategic Alliances",
    description: "Rich alliances with authorized OEM distributors, Third-Party quality inspectors, and global freight forwarders ensuring access to the best resources worldwide."
  },
  {
    icon: Globe,
    title: "Global Standards, Local Expertise",
    description: "International best practices combined with deep understanding of Nigerian market dynamics, regulatory requirements, and operational challenges."
  },
  {
    icon: Zap,
    title: "Rapid Response",
    description: "24/7 emergency response capability with pre-positioned equipment and dedicated teams ready for immediate deployment across Nigeria."
  },
  {
    icon: Shield,
    title: "Safety First Culture",
    description: "Unwavering commitment to 'All Accidents Are Preventable' philosophy with comprehensive safety protocols and zero compromise on safety standards."
  },
  {
    icon: Target,
    title: "Budget & Timeline Focused",
    description: "Work closely with clients to ensure objectives are met, managing design and delivery processes to ensure execution costs meet required budgets."
  }
]

export function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-secondary/20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Advantage
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Why Choose <span className="text-primary">M.I Resources</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Combining experience, expertise, and commitment to deliver exceptional results for your projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            
            return (
              <motion.div
                key={reason.title}
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
                    {reason.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
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
