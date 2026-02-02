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
          transition={{ duration: 0.3 }}
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
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative overflow-hidden"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Logo Skeletons Container */}
          <div 
            className="flex items-center"
            style={{
              animation: 'scroll-left-mobile 25s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* First set of logo skeletons */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8"
              >
                <div className="w-24 h-12 sm:w-32 sm:h-16 lg:w-40 lg:h-20 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-border/20 animate-pulse" />
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`second-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (index + 6) * 0.05 }}
                className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8"
              >
                <div className="w-24 h-12 sm:w-32 sm:h-16 lg:w-40 lg:h-20 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-border/20 animate-pulse" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll-left-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (min-width: 768px) {
          .flex.items-center {
            animation: scroll-left-tablet 30s linear infinite !important;
          }
        }
        
        @media (min-width: 1024px) {
          .flex.items-center {
            animation: scroll-left 40s linear infinite !important;
          }
        }
        
        @keyframes scroll-left-tablet {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
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