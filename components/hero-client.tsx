'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Marquee from './marquee'
import { HeroContent } from '@/types/sanity'
import { getOptimizedImageUrl } from '@/lib/image-utils'

interface HeroClientProps {
  content: HeroContent
}

export function HeroClient({ content }: HeroClientProps) {
  const {
    headline,
    subheadline,
    description,
    primaryCTA,
    secondaryCTA,
    backgroundImage,
    stats,
  } = content

  // Get background image URL if available
  const bgImageUrl = backgroundImage
    ? getOptimizedImageUrl(backgroundImage, { width: 1920, quality: 80, format: 'webp' })
    : '/oil-rig-industrial-silhouette-dark-moody.jpg'

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${bgImageUrl}')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/84 via-background/72 to-background/95" />
        <div className="absolute inset-0 bg-linear-to-r from-background/84 via-background/5 to-background/62" />
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="max-w-4xl">
          {/* Subheadline Badge */}
          {subheadline && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="hidden sm:inline">{subheadline}</span>
                <span className="sm:hidden">Oil & Gas Support Services</span>
              </span>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-balance"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)' }}
          >
            {headline}
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-foreground/65 max-w-2xl leading-relaxed prose prose-invert"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)' }}
          >
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mt-6 mb-4">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-xl font-semibold mt-4 mb-3">{children}</h4>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            {primaryCTA && (
              <motion.a
                href={primaryCTA.url}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full text-sm sm:text-base font-semibold hover:bg-primary/90 transition-all"
              >
                {primaryCTA.text}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>
            )}
            {secondaryCTA && (
              <motion.a
                href={secondaryCTA.url}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-semibold hover:bg-secondary transition-all"
              >
                {secondaryCTA.text}
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat._key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={32} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}