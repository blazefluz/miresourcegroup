'use client'

import { motion } from 'framer-motion'

export function ServicesSkeleton() {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge Skeleton */}
          <div className="w-24 h-4 bg-primary/30 rounded animate-pulse mx-auto mb-4" />
          
          {/* Headline Skeleton */}
          <div className="space-y-3 mb-6">
            <div className="w-3/4 h-12 bg-foreground/10 rounded animate-pulse mx-auto" />
            <div className="w-1/2 h-12 bg-foreground/10 rounded animate-pulse mx-auto" />
          </div>
          
          {/* Description Skeleton */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="w-full h-5 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="w-4/5 h-5 bg-muted-foreground/20 rounded animate-pulse mx-auto" />
          </div>
        </motion.div>

        {/* Services Grid Skeleton */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-card rounded-3xl border border-border overflow-hidden">
                <div className="relative z-10">
                  {/* Icon Skeleton */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 animate-pulse mb-6" />

                  {/* Title Skeleton */}
                  <div className="w-3/4 h-6 bg-foreground/10 rounded animate-pulse mb-4" />

                  {/* Description Skeleton */}
                  <div className="space-y-2 mb-6">
                    <div className="w-full h-4 bg-muted-foreground/20 rounded animate-pulse" />
                    <div className="w-5/6 h-4 bg-muted-foreground/20 rounded animate-pulse" />
                    <div className="w-4/5 h-4 bg-muted-foreground/20 rounded animate-pulse" />
                  </div>

                  {/* Features List Skeleton */}
                  <div className="space-y-2 mb-8">
                    {Array.from({ length: 4 }).map((_, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
                        <div className="w-32 h-3 bg-muted-foreground/20 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>

                  {/* CTA Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-4 bg-primary/30 rounded animate-pulse" />
                    <div className="w-4 h-4 bg-primary/30 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}