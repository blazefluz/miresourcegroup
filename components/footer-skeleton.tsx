'use client'

import { motion } from 'framer-motion'

export function FooterSkeleton() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Brand Name Skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-28 h-6 bg-foreground/10 rounded animate-pulse" />
              <div className="w-20 h-5 bg-primary/30 rounded animate-pulse" />
            </div>
            
            {/* Tagline Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="w-full h-4 bg-muted-foreground/20 rounded animate-pulse" />
              <div className="w-4/5 h-4 bg-muted-foreground/20 rounded animate-pulse" />
            </div>

            {/* Social Links Skeleton */}
            <div className="flex gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="w-10 h-10 rounded-lg bg-primary/10 animate-pulse"
                />
              ))}
            </div>
          </motion.div>

          {/* Footer Sections Skeleton */}
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (sectionIndex + 1) * 0.05 }}
            >
              {/* Section Title Skeleton */}
              <div className="w-24 h-5 bg-foreground/10 rounded animate-pulse mb-6" />
              
              {/* Links Skeleton */}
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, linkIndex) => (
                  <motion.div
                    key={linkIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: (sectionIndex + 1) * 0.05 + linkIndex * 0.03 }}
                    className="w-20 h-4 bg-muted-foreground/20 rounded animate-pulse"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Copyright Section Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-64 h-4 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="w-32 h-4 bg-muted-foreground/20 rounded animate-pulse" />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}