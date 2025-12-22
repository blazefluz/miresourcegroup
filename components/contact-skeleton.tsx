'use client'

import { motion } from 'framer-motion'

export function ContactSkeleton() {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge Skeleton */}
            <div className="w-24 h-4 bg-primary/30 rounded animate-pulse mb-4" />
            
            {/* Headline Skeleton */}
            <div className="space-y-3 mb-6">
              <div className="w-full h-12 bg-foreground/10 rounded animate-pulse" />
              <div className="w-3/4 h-12 bg-foreground/10 rounded animate-pulse" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-3 mb-12">
              <div className="w-full h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-5/6 h-5 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-4/5 h-5 bg-muted-foreground/20 rounded animate-pulse" />
            </div>

            {/* Contact Info Cards Skeleton */}
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border"
                >
                  {/* Icon Skeleton */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 animate-pulse flex-shrink-0" />
                  
                  <div className="flex-1">
                    {/* Label Skeleton */}
                    <div className="w-20 h-4 bg-foreground/10 rounded animate-pulse mb-1" />
                    
                    {/* Value Skeleton */}
                    <div className="w-32 h-3 bg-muted-foreground/20 rounded animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Form Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-card rounded-3xl p-8 border border-border"
          >
            <div className="space-y-6">
              {/* Form Fields Skeleton */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="w-16 h-4 bg-foreground/10 rounded animate-pulse mb-2" />
                  <div className="w-full h-12 bg-input rounded-lg animate-pulse" />
                </div>
                <div>
                  <div className="w-12 h-4 bg-foreground/10 rounded animate-pulse mb-2" />
                  <div className="w-full h-12 bg-input rounded-lg animate-pulse" />
                </div>
              </div>

              <div>
                <div className="w-20 h-4 bg-foreground/10 rounded animate-pulse mb-2" />
                <div className="w-full h-12 bg-input rounded-lg animate-pulse" />
              </div>

              <div>
                <div className="w-16 h-4 bg-foreground/10 rounded animate-pulse mb-2" />
                <div className="w-full h-32 bg-input rounded-lg animate-pulse" />
              </div>

              {/* Submit Button Skeleton */}
              <div className="w-full h-12 bg-primary/30 rounded-lg animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}