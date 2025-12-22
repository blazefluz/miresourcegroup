"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wrench, Truck, Briefcase, Settings, Shield, Zap, Globe, Users, Target, Award, ArrowUpRight } from "lucide-react"
import { PortableText } from '@portabletext/react'
import { ServicesContent } from '@/types/sanity'

// Icon mapping for services
const iconMap = {
  wrench: Wrench,
  truck: Truck,
  briefcase: Briefcase,
  settings: Settings,
  shield: Shield,
  zap: Zap,
  globe: Globe,
  users: Users,
  target: Target,
  award: Award,
}

interface ServicesClientProps {
  content: ServicesContent
}

export function ServicesClient({ content }: ServicesClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Helper function to render headline with highlighted text
  const renderHeadline = () => {
    if (!content.highlightedText) {
      return content.headline
    }

    const parts = content.headline.split(content.highlightedText)
    if (parts.length !== 2) {
      return content.headline
    }

    return (
      <>
        {parts[0]}
        <span className="text-primary">{content.highlightedText}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section id="services" className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {content.badgeText && (
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              {content.badgeText}
            </span>
          )}
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            {renderHeadline()}
          </h2>
          {content.description && (
            <div className="mt-6 text-lg text-muted-foreground prose prose-lg max-w-none">
              <PortableText value={content.description} />
            </div>
          )}
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {content.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Briefcase
            
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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>

                    <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>

                    {service.features && service.features.length > 0 && (
                      <ul className="mt-6 space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {service.ctaText && service.ctaUrl && (
                      <div className="mt-8">
                        <a
                          href={service.ctaUrl}
                          className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                        >
                          {service.ctaText}
                          <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                        </a>
                      </div>
                    )}
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