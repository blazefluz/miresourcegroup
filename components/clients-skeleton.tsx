'use client'

import { motion } from 'framer-motion'

export function ClientsSkeleton() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge Skeleton */}
          <div className="w-32 h-4 bg-primary/30 rounded animate-pulse mx-auto mb-2" />
          
          {/* Headline Skeleton */}
          <div className="space-y-2">
            <div className="w-80 h-8 bg-foreground/10 rounded animate-pulse mx-auto" />
            <div className="w-48 h-8 bg-foreground/10 rounded animate-pulse mx-auto" />
          </div>
        </motion.div>

        {/* Scrolling Logos Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Logo Skeletons Container */}
          <div 
            className="flex items-center"
            style={{
              animation: 'scroll-left 35s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* First set of logo skeletons */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 mx-8"
              >
                <div className="w-32 h-16 sm:w-40 sm:h-20 bg-white rounded-2xl shadow-sm border border-border/20 animate-pulse" />
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`second-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index + 6) * 0.1 }}
                className="flex-shrink-0 mx-8"
              >
                <div className="w-32 h-16 sm:w-40 sm:h-20 bg-white rounded-2xl shadow-sm border border-border/20 animate-pulse" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}