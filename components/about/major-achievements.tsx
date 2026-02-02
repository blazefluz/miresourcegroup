"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Target, TrendingUp, Shield, Users, Zap } from "lucide-react"

const achievements = [
  {
    icon: Shield,
    title: "Zero Lost Time Incidents",
    description: "Maintained exemplary safety record through rigorous adherence to our 'All Accidents Are Preventable' philosophy and comprehensive safety protocols.",
    metric: "Safety First",
    color: "bg-orange-500"
  },
  {
    icon: Users,
    title: "Major Client Portfolio",
    description: "Trusted partner to industry leaders including Shell, Chevron, ExxonMobil, NNPC, Nigeria LNG, and Addax Petroleum for critical operations support.",
    metric: "Top Tier",
    color: "bg-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Strategic Expansion",
    description: "Expanded operations from Port Harcourt to Lagos, growing equipment fleet and workforce to serve larger, more complex projects across Nigeria.",
    metric: "2 Locations",
    color: "bg-indigo-500"
  },
  {
    icon: Zap,
    title: "24/7 Emergency Response",
    description: "Established rapid response capability with dedicated teams and equipment ready for immediate deployment to support critical operations.",
    metric: "Always Ready",
    color: "bg-red-500"
  },
  {
    icon: Target,
    title: "Turnkey Project Delivery",
    description: "Successfully delivered complete turnkey solutions managing entire project lifecycles from design to commissioning for major operators.",
    metric: "End-to-End",
    color: "bg-green-500"
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Maintained consistent quality standards across all projects through systematic quality management and continuous improvement processes.",
    metric: "Zero Defects",
    color: "bg-blue-500"
  }
]

export function MajorAchievements() {
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
            Proven Excellence
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Key <span className="text-primary">Achievements</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Demonstrating our commitment to safety, quality, and operational excellence in Nigeria's Oil & Gas industry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon
            
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-6 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon and Metric */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${achievement.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                        {achievement.metric}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
