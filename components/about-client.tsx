'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PortableText } from '@portabletext/react'
import { 
  Target, 
  Award, 
  Users, 
  Zap, 
  Briefcase, 
  Settings, 
  Shield, 
  TrendingUp, 
  Heart, 
  Globe,
  Wrench,
  Truck,
  Package,
  Building2,
  Handshake,
  Factory,
  Gauge,
  Lightbulb,
  CheckCircle2,
  Rocket,
  Sparkles,
  Crown,
  Star,
  Gem,
  BadgeCheck
} from 'lucide-react'
import { AboutContent } from '@/types/sanity'

interface AboutClientProps {
  content: AboutContent
}

// Icon mapping for predefined icons
const iconMap = {
  target: Target,
  award: Award,
  users: Users,
  zap: Zap,
  briefcase: Briefcase,
  settings: Settings,
  shield: Shield,
  'trending-up': TrendingUp,
  heart: Heart,
  globe: Globe,
  wrench: Wrench,
  truck: Truck,
  package: Package,
  building: Building2,
  handshake: Handshake,
  factory: Factory,
  gauge: Gauge,
  lightbulb: Lightbulb,
  check: CheckCircle2,
  rocket: Rocket,
  sparkles: Sparkles,
  crown: Crown,
  star: Star,
  gem: Gem,
  badge: BadgeCheck
}

export function AboutClient({ content }: AboutClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const {
    badgeText,
    headline,
    highlightedText,
    description,
    features,
  } = content

  // Create headline with highlighted text
  const renderHeadline = () => {
    if (!highlightedText || !headline.includes(highlightedText)) {
      return headline
    }

    const parts = headline.split(highlightedText)
    return (
      <>
        {parts[0]}
        <span className="text-primary">{highlightedText}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section id="about" className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {badgeText && (
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              {badgeText}
            </span>
          )}
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            {renderHeadline()}
          </h2>
          <div className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                },
              }}
            />
          </div>
        </motion.div>

        {/* Features Grid - Key Capabilities Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Target
            
            return (
              <motion.div
                key={feature._key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-8 bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 mb-6">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}