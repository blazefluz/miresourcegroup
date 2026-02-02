'use client'

import { motion } from 'framer-motion'

export function TestimonialsSkeleton() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge Skeleton */}
          <div className="w-32 h-4 bg-primary/30 rounded animate-pulse mx-auto mb-4" />
          
          {/* Headline Skeleton */}
          <div className="space-y-3">
            <div className="w-2/3 h-12 bg-foreground/10 rounded animate-pulse mx-auto" />
            <div className="w-1/2 h-12 bg-foreground/10 rounded animate-pulse mx-auto" />
          </div>
        </motion.div>

        {/* Testimonials Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-3xl p-8 border border-border"
            >
              {/* Quote Skeleton */}
              <div className="space-y-3 mb-8">
                <div className="w-full h-4 bg-muted-foreground/20 rounded animate-pulse" />
                <div className="w-11/12 h-4 bg-muted-foreground/20 rounded animate-pulse" />
                <div className="w-4/5 h-4 bg-muted-foreground/20 rounded animate-pulse" />
                <div className="w-3/4 h-4 bg-muted-foreground/20 rounded animate-pulse" />
              </div>

              {/* Author Info Skeleton */}
              <div className="flex items-center gap-4">
                {/* Avatar Skeleton */}
                <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse flex-shrink-0" />
                
                <div className="flex-1">
                  {/* Author Name Skeleton */}
                  <div className="w-24 h-4 bg-foreground/10 rounded animate-pulse mb-1" />
                  
                  {/* Role and Company Skeleton */}
                  <div className="w-32 h-3 bg-muted-foreground/20 rounded animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots Skeleton */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-border animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  )
}