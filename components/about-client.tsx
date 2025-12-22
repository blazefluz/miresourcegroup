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
  Globe 
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
}

export function AboutClient({ content }: AboutClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const {
    badgeText,
    headline,
    highlightedText,
    description,
    ctaText,
    ctaUrl,
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
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {badgeText && (
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {badgeText}
              </span>
            )}
            
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {renderHeadline()}
            </h2>
            
            <div className="mt-6 text-lg text-muted-foreground leading-relaxed prose prose-invert max-w-none">
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
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>

            {ctaText && ctaUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <a
                  href={ctaUrl}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
                >
                  {ctaText}
                  <span className="text-xl">→</span>
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* Right Content - Feature Grid */}
          <div className={`grid gap-6 ${
            features && features.length <= 2 
              ? 'grid-cols-1' 
              : features && features.length <= 4 
                ? 'sm:grid-cols-2' 
                : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {features?.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Target
              
              return (
                <motion.div
                  key={feature._key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}