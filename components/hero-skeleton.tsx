'use client'

import { motion } from 'framer-motion'

export function HeroSkeleton() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content Skeleton */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
              <div className="w-32 h-4 bg-primary/30 rounded animate-pulse" />
            </div>
          </motion.div>

          {/* Headline Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <div className="w-full h-16 bg-foreground/10 rounded animate-pulse" />
            <div className="w-3/4 h-16 bg-foreground/10 rounded animate-pulse" />
          </motion.div>

          {/* Description Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 mb-10"
          >
            <div className="w-full h-6 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="w-5/6 h-6 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="w-4/5 h-6 bg-muted-foreground/20 rounded animate-pulse" />
          </motion.div>

          {/* CTA Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <div className="w-40 h-12 bg-primary/30 rounded-full animate-pulse" />
            <div className="w-32 h-12 bg-border/50 rounded-full animate-pulse" />
          </motion.div>

          {/* Stats Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-10 bg-primary/30 rounded mx-auto mb-2 animate-pulse" />
                <div className="w-20 h-4 bg-muted-foreground/20 rounded mx-auto animate-pulse" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-8 h-8 bg-muted-foreground/30 rounded animate-pulse" />
      </motion.div>
    </section>
  )
}