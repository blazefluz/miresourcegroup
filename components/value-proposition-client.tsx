"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Clock, Lightbulb, HeartHandshake, CheckCircle2, Award, Users, Zap, Target, Briefcase, TrendingUp } from "lucide-react"
import { PortableText } from '@portabletext/react'
import { ValuePropositionContent } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

// Icon mapping for values
const iconMap = {
  shield: Shield,
  clock: Clock,
  lightbulb: Lightbulb,
  'heart-handshake': HeartHandshake,
  'check-circle': CheckCircle2,
  award: Award,
  users: Users,
  zap: Zap,
  target: Target,
  briefcase: Briefcase,
  'trending-up': TrendingUp,
}

interface ValuePropositionClientProps {
  content: ValuePropositionContent
}

export function ValuePropositionClient({ content }: ValuePropositionClientProps) {
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

  // Get image URL with optimization
  const getImageUrl = () => {
    if (content.heroImage?.asset?._ref) {
      // Convert Sanity asset reference to CDN URL
      const ref = content.heroImage.asset._ref
      const [assetId, dimensions, format] = ref.replace('image-', '').split('-')
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${assetId}-${dimensions}.${format}?w=600&h=600&fit=crop&auto=format`
    }
    return '/three-factory-workers-safety-hats-discussing-manufacture-plan.jpg'
  }

  return (
    <section id="why-us" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />

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
                <Image
                  src={getImageUrl()}
                  alt={content.heroImage?.alt || 'M.I Resources Team'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating success card */}
              {content.successMetric?.show && content.successMetric.value && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-0 left-0 p-6 bg-card rounded-2xl border border-border shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {(() => {
                        const SuccessIcon = iconMap[content.successMetric?.icon as keyof typeof iconMap] || CheckCircle2
                        return <SuccessIcon className="w-6 h-6 text-primary" />
                      })()}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{content.successMetric.value}</div>
                      <div className="text-sm text-muted-foreground">{content.successMetric.label}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Decorative rings */}
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
            {content.badgeText && (
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {content.badgeText}
              </span>
            )}
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {renderHeadline()}
            </h2>
            {content.description && (
              <div className="mt-6 text-lg text-muted-foreground leading-relaxed prose prose-lg max-w-none">
                <PortableText value={content.description} />
              </div>
            )}

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {content.values.map((value, index) => {
                const IconComponent = iconMap[value.icon] || Shield
                
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{value.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}