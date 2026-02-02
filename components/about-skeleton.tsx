'use client'

import { motion } from 'framer-motion'

export function AboutSkeleton() {
  return (
    <section id="about" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge Skeleton */}
            <div className="w-32 h-4 bg-primary/30 rounded animate-pulse mb-4" />
            
            {/* Headline Skeleton */}
            <div className="space-y-3 mb-6">
              <div className="w-full h-12 bg-foreground/10 rounded animate-pulse" />
              <div className="w-4/5 h-12 bg-foreground/10 rounded animate-pulse" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="w-full h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-11/12 h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-5/6 h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-3/4 h-5 bg-muted-foreground/20 rounded animate-pulse" />
            </div>

            {/* CTA Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-28 h-5 bg-primary/30 rounded animate-pulse" />
              <div className="w-6 h-5 bg-primary/30 rounded animate-pulse" />
            </div>
          </motion.div>

          {/* Right Content - Feature Grid Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="p-6 bg-card rounded-2xl border border-border"
              >
                {/* Icon Skeleton */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 animate-pulse mb-4" />
                
                {/* Title Skeleton */}
                <div className="w-3/4 h-5 bg-foreground/10 rounded animate-pulse mb-2" />
                
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="w-full h-3 bg-muted-foreground/20 rounded animate-pulse" />
                  <div className="w-5/6 h-3 bg-muted-foreground/20 rounded animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}