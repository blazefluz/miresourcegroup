"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Wrench, Package, BarChart3, Truck, Lightbulb, HardHat, CheckCircle2, ArrowRight, Users, Radio } from "lucide-react"
import type { ServiceDetailed } from "@/types/sanity"
import { getImageUrl } from "@/lib/image-utils"

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  Wrench,
  Package,
  BarChart3,
  Truck,
  Lightbulb,
  Radio,
  CheckCircle2,
  Users,
  HardHat,
}

interface ServiceDetailsProps {
  services: ServiceDetailed[]
}

export function ServiceDetails({ services }: ServiceDetailsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Service Portfolio
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Comprehensive <span className="text-primary">Solutions</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Full-spectrum support services backed by experienced teams, modern equipment, and proven methodologies for Nigeria's Oil & Gas industry
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName]
            const isActive = activeTab === index
            
            return (
              <motion.button
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? `${service.bgColor} text-white shadow-lg`
                    : 'bg-card text-foreground border border-border hover:border-primary/40'
                }`}
              >
                {IconComponent && <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="hidden sm:inline">{service.title}</span>
                <span className="sm:hidden text-xs">{service.title.split(' ')[0]}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Service Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Image */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={getImageUrl(services[activeTab].image)}
                alt={services[activeTab].image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:via-black/30 lg:to-transparent" />
              
              {/* Icon Overlay */}
              <div className="absolute bottom-6 left-6 lg:top-6 lg:bottom-auto">
                {(() => {
                  const IconComponent = iconMap[services[activeTab].iconName]
                  return IconComponent ? (
                    <div className={`w-16 h-16 rounded-2xl ${services[activeTab].bgColor} flex items-center justify-center shadow-2xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  ) : null
                })()}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {services[activeTab].title}
                </h3>
                <p className={`text-xs sm:text-sm font-semibold ${services[activeTab].color} mb-3 sm:mb-4`}>
                  {services[activeTab].tagline}
                </p>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
                  {services[activeTab].description.split('\n\n').map((paragraph, idx) => {
                    const trimmedPara = paragraph.trim()
                    
                    // Check if paragraph starts with ** (bold header)
                    if (trimmedPara.startsWith('**') && trimmedPara.includes('**', 2)) {
                      const endBold = trimmedPara.indexOf('**', 2)
                      const boldText = trimmedPara.substring(2, endBold)
                      const restText = trimmedPara.substring(endBold + 2).trim()
                      
                      return (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-base sm:text-lg font-bold text-foreground">{boldText}</h4>
                          {restText && <p className="leading-relaxed">{restText}</p>}
                        </div>
                      )
                    }
                    
                    return trimmedPara ? (
                      <p key={idx} className="leading-relaxed">{trimmedPara}</p>
                    ) : null
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                  Key Capabilities & Features
                </h4>
                <div className="grid gap-3">
                  {services[activeTab].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${services[activeTab].color} shrink-0 mt-0.5`} />
                      <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Request This Service
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 bg-primary/5 rounded-2xl border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">
                Need a Custom Solution?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We offer turnkey packages or customized groupings of individual services tailored to your specific needs
              </p>
            </div>
            <a
              href="/contact"
              className="w-full md:w-auto shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap text-center"
            >
              Discuss Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
