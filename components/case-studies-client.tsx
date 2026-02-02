"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, CheckCircle2, TrendingUp, Clock, Users } from "lucide-react"

const caseStudies = [
  {
    client: "Major Oil & Gas Operator",
    industry: "Upstream Operations",
    project: "Offshore Platform Equipment Supply & Logistics",
    challenge: "Required rapid mobilization of specialized equipment and materials to offshore platform with strict safety and quality requirements.",
    solution: "Deployed our comprehensive supply chain management system with 24/7 logistics support, quality inspection protocols, and emergency response capability.",
    results: [
      { metric: "100%", label: "On-time Delivery" },
      { metric: "Zero", label: "Safety Incidents" },
      { metric: "30%", label: "Cost Reduction" }
    ],
    services: ["Procurement", "Supply Chain", "Logistics"],
    duration: "12 months",
    icon: Building2,
    color: "bg-blue-500"
  },
  {
    client: "International Energy Company",
    industry: "Midstream Infrastructure",
    project: "Pipeline Construction & Maintenance Support",
    challenge: "Complex pipeline project requiring heavy construction equipment, welding services, and continuous material supply across multiple locations.",
    solution: "Provided turnkey solution including CAT wheel loaders, excavators, welding teams, and coordinated material distribution using our 7 Rs logistics framework.",
    results: [
      { metric: "45 Days", label: "Ahead of Schedule" },
      { metric: "100%", label: "Quality Compliance" },
      { metric: "500+", label: "Tons Moved" }
    ],
    services: ["Engineering", "Equipment Rental", "Logistics"],
    duration: "18 months",
    icon: Building2,
    color: "bg-green-500"
  },
  {
    client: "Nigerian Oil Corporation",
    industry: "Downstream Operations",
    project: "Facility Maintenance & Equipment Management",
    challenge: "Needed reliable partner for ongoing facility maintenance, equipment supply, and emergency response support for critical operations.",
    solution: "Established dedicated support team with pre-positioned equipment, preventive maintenance schedules, and 24/7 emergency response capability.",
    results: [
      { metric: "99.8%", label: "Uptime Achieved" },
      { metric: "24/7", label: "Support Available" },
      { metric: "15%", label: "Efficiency Gain" }
    ],
    services: ["Management Services", "Equipment Supply", "Maintenance"],
    duration: "Ongoing",
    icon: Building2,
    color: "bg-purple-500"
  }
]

export function CaseStudiesClient() {
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
            Success Stories
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Client <span className="text-primary">Case Studies</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-world examples of how we deliver exceptional results for our clients in Nigeria's Oil & Gas industry
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const IconComponent = study.icon
            
            return (
              <motion.div
                key={study.project}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="p-8 bg-card rounded-3xl border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-500">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Overview */}
                    <div className="lg:col-span-1">
                      <div className={`inline-flex w-14 h-14 rounded-xl ${study.color} items-center justify-center mb-4`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {study.project}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Client</p>
                          <p className="text-sm font-semibold text-foreground">{study.client}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Industry</p>
                          <p className="text-sm font-semibold text-foreground">{study.industry}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {study.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {study.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Middle Column - Challenge & Solution */}
                    <div className="lg:col-span-1 space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center">
                            <span className="text-red-500 text-xs">!</span>
                          </div>
                          Challenge
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          </div>
                          Solution
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="lg:col-span-1">
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Results Achieved
                      </h4>
                      
                      <div className="space-y-4">
                        {study.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-secondary/50 rounded-xl border border-border"
                          >
                            <div className="text-3xl font-bold text-primary mb-1">
                              {result.metric}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center p-8 bg-primary/5 rounded-2xl border border-primary/20"
        >
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h4 className="text-2xl font-bold text-foreground mb-3">
            Ready to Achieve Similar Results?
          </h4>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss how our proven methodologies and expertise can support your next project
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
