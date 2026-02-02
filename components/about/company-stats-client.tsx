"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Users, Award, Globe } from "lucide-react"

const iconMap = {
  'trending-up': TrendingUp,
  users: Users,
  award: Award,
  globe: Globe,
}

interface Stat {
  label: string
  value: string
  suffix?: string
  icon?: string
  description?: string
}

interface CompanyStatsClientProps {
  stats: Stat[]
}

export function CompanyStatsClient({ stats }: CompanyStatsClientProps) {
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
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || TrendingUp
            
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
                  {stat.value}{stat.suffix || ''}
                </div>
                <div className="text-xl font-semibold text-primary-foreground mb-2">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-primary-foreground/80">
                    {stat.description}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
