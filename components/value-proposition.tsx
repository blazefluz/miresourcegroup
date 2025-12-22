"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Clock, Lightbulb, HeartHandshake, CheckCircle2 } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Uncompromising commitment to safety standards and practices",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Reliable project completion within agreed timelines",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Cutting-edge solutions for complex challenges",
  },
  {
    icon: HeartHandshake,
    title: "Partnership",
    description: "Building lasting relationships with our clients",
  },
]

export default function ValueProposition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-us" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              {/* Main image container */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden border border-border">
                <img
                  src="/industrial-team-engineers-working-oil-platform.jpg"
                  alt="M.I Resource Group Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 p-6 bg-card rounded-2xl border border-border shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">100%</div>
                    <div className="text-sm text-muted-foreground">Project Success Rate</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary/10 rounded-full" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              Your Trusted Partner in <span className="text-primary">Energy Excellence</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              With a proven track record and unwavering commitment to quality, M.I Resource Group stands as the premier
              choice for support services in Nigeria&apos;s energy sector.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
