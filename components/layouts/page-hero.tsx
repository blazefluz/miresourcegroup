"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  overlayOpacity?: number
}

export function PageHero({ 
  title, 
  subtitle, 
  backgroundImage = "/hero-african-industrial-facility.jpg",
  overlayOpacity = 0.7 
}: PageHeroProps) {
  return (
    <section className="relative h-[80vh] min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Modern gradient overlay */}
        <div 
          className="absolute inset-0 bg-linear-to-br from-background via-background/90 to-background/70" 
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(232, 180, 79, 0.2) 1.5px, transparent 1.5px),
                           linear-gradient(90deg, rgba(232, 180, 79, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Main title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
