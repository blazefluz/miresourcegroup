'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ClientsContent } from '@/types/sanity'
import { getOptimizedImageUrl } from '@/lib/image-utils'

interface ClientsClientProps {
  content: ClientsContent
}

export function ClientsClient({ content }: ClientsClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const {
    badgeText,
    headline,
    highlightedText,
    clientLogos = [], // Provide default empty array
    animationSettings
  } = content

  // Sort logos by order
  const sortedLogos = (clientLogos && Array.isArray(clientLogos)) 
    ? [...clientLogos].sort((a, b) => a.order - b.order)
    : []

  // Create headline with highlighted text
  const renderHeadline = () => {
    if (!highlightedText || !headline.includes(highlightedText)) {
      return headline
    }

    const parts = headline.split(highlightedText)
    return (
      <>
        {parts[0]}
        <span className="text-primary">{highlightedText}</span>
        {parts[1]}
      </>
    )
  }

  // Animation settings
  const scrollSpeed = animationSettings?.scrollSpeed || 35
  const pauseOnHover = animationSettings?.pauseOnHover ?? true

  return (
    <section className="py-16 bg-background relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        {(badgeText || headline) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {badgeText && (
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {badgeText}
              </span>
            )}
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-balance">
              {renderHeadline()}
            </h2>
          </motion.div>
        )}

        {/* Scrolling Logos Container */}
        {sortedLogos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden"
          >
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-l from-background to-transparent z-10" />

          {/* Scrolling Container */}
          <div 
            className={`flex items-center clients-scroll ${pauseOnHover ? 'hover:paused' : ''}`}
            style={{
              '--scroll-speed-mobile': `${Math.max(scrollSpeed * 0.5, 20)}s`,
              '--scroll-speed-tablet': `${Math.max(scrollSpeed * 0.8, 35)}s`,
              '--scroll-speed-desktop': `${Math.max(scrollSpeed, 50)}s`,
              width: 'fit-content'
            } as React.CSSProperties}
          >
            {/* First set of logos */}
            {sortedLogos.map((logo) => {
              const imageUrl = logo.logo?.asset?.url 
                ? getOptimizedImageUrl(logo.logo, { width: 280, height: 140, format: 'webp' })
                : '/placeholder-logo.svg'

              return (
                <motion.div
                  key={`first-${logo._key}`}
                  className="shrink-0 mx-4 sm:mx-6 lg:mx-8 group cursor-default"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="relative w-28 h-14 sm:w-40 sm:h-20 lg:w-52 lg:h-26 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-sm border border-border/20">
                    <Image
                      src={imageUrl}
                      alt={logo.altText}
                      fill
                      className="object-contain transition-all duration-300 p-3"
                      sizes="(max-width: 640px) 176px, 208px"
                    />
                  </div>
                </motion.div>
              )
            })}

            {/* Duplicate set for seamless loop */}
            {sortedLogos.map((logo) => {
              const imageUrl = logo.logo?.asset?.url 
                ? getOptimizedImageUrl(logo.logo, { width: 280, height: 140, format: 'webp' })
                : '/placeholder-logo.svg'

              return (
                <motion.div
                  key={`second-${logo._key}`}
                  className="shrink-0 mx-4 sm:mx-6 lg:mx-8 group cursor-default"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="relative w-28 h-14 sm:w-40 sm:h-20 lg:w-52 lg:h-26 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-sm border border-border/20">
                    <Image
                      src={imageUrl}
                      alt={logo.altText}
                      fill
                      className="object-contain transition-all duration-300 p-3"
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 208px"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
        )}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        .clients-scroll {
          animation: scroll-left var(--scroll-speed-mobile) linear infinite;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (min-width: 768px) {
          .clients-scroll {
            animation-duration: var(--scroll-speed-tablet);
          }
        }
        
        @media (min-width: 1024px) {
          .clients-scroll {
            animation-duration: var(--scroll-speed-desktop);
          }
        }
      `}</style>
    </section>
  )
}