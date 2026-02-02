'use client'

import { motion } from 'framer-motion'

export function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Brand Name Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div className="w-32 h-6 bg-foreground/10 rounded animate-pulse" />
            <div className="w-24 h-5 bg-primary/30 rounded animate-pulse" />
          </motion.div>

          {/* Navigation Skeleton */}
          <nav className="hidden md:flex items-center gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="w-16 h-4 bg-muted-foreground/20 rounded animate-pulse"
              />
            ))}
          </nav>

          {/* CTA Button Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="w-28 h-10 bg-primary/30 rounded-full animate-pulse"
          />
        </div>
      </div>
    </header>
  )
}