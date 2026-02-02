"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2 } from "lucide-react"

interface TimelineItem {
  year: string
  title: string
  description?: string
}

interface CompanyTimelineClientProps {
  milestones: TimelineItem[]
}

export function CompanyTimelineClient({ milestones }: CompanyTimelineClientProps) {
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
            Our Journey
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Company <span className="text-primary">Timeline</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            A history of growth, innovation, and excellence in the Oil & Gas industry
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border lg:left-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="inline-block p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-primary font-bold text-2xl mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    {milestone.description && (
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
