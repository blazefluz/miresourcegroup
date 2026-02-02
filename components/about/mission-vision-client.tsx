"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Eye } from "lucide-react"

interface MissionVisionData {
  mission: string
  vision: string
}

interface MissionVisionClientProps {
  data: MissionVisionData
}

export function MissionVisionClient({ data }: MissionVisionClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Mission</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.mission}
              </p>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Vision</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.vision}
              </p>

              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
