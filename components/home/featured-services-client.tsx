"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wrench, Truck, Briefcase } from "lucide-react"
import { ServicesContent } from '@/types/sanity'
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Icon mapping for services
const iconMap = {
  wrench: Wrench,
  truck: Truck,
  briefcase: Briefcase,
}

interface FeaturedServicesClientProps {
  content: ServicesContent
}

export function FeaturedServicesClient({ content }: FeaturedServicesClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Show only first 3 services for featured section
  const featuredServices = content.services.slice(0, 3)

  return (
    <section id="services" className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Our Core <span className="text-primary">Services</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Comprehensive support services tailored for Nigeria's Oil & Gas industry
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Briefcase
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="relative h-full p-8 bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>

                    <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>

                    {service.features && service.features.length > 0 && (
                      <ul className="mt-6 space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Services Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Services
            <ArrowRight size={18} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
