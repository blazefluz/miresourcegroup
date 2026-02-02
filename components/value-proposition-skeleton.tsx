'use client'

import { motion } from 'framer-motion'

export function ValuePropositionSkeleton() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge Skeleton */}
            <div className="w-28 h-4 bg-primary/30 rounded animate-pulse mb-4" />
            
            {/* Headline Skeleton */}
            <div className="space-y-3 mb-6">
              <div className="w-full h-12 bg-foreground/10 rounded animate-pulse" />
              <div className="w-3/4 h-12 bg-foreground/10 rounded animate-pulse" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-3 mb-12">
              <div className="w-full h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-11/12 h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-4/5 h-5 bg-muted-foreground/20 rounded animate-pulse" />
            </div>

            {/* Values Grid Skeleton */}
            <div className="grid sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon Skeleton */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 animate-pulse flex-shrink-0 mt-1" />
                  
                  <div className="flex-1">
                    {/* Title Skeleton */}
                    <div className="w-3/4 h-5 bg-foreground/10 rounded animate-pulse mb-2" />
                    
                    {/* Description Skeleton */}
                    <div className="space-y-1">
                      <div className="w-full h-3 bg-muted-foreground/20 rounded animate-pulse" />
                      <div className="w-4/5 h-3 bg-muted-foreground/20 rounded animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image and Success Metric Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            {/* Hero Image Skeleton */}
            <div className="relative aspect-[4/3] rounded-3xl bg-muted/30 animate-pulse overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            </div>

            {/* Floating Success Metric Skeleton */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-card border border-border rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                {/* Metric Icon Skeleton */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 animate-pulse" />
                
                <div>
                  {/* Metric Value Skeleton */}
                  <div className="w-16 h-8 bg-primary/30 rounded animate-pulse mb-1" />
                  
                  {/* Metric Label Skeleton */}
                  <div className="w-20 h-3 bg-muted-foreground/20 rounded animate-pulse" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}