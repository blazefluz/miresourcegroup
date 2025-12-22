"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { TestimonialsContent } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

interface TestimonialsClientProps {
  content: TestimonialsContent
}

export function TestimonialsClient({ content }: TestimonialsClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  // Helper function to render headline with highlighted text
  const renderHeadline = () => {
    if (!content.highlightedText) {
      return content.headline
    }

    const parts = content.headline.split(content.highlightedText)
    if (parts.length !== 2) {
      return content.headline
    }

    return (
      <>
        {parts[0]}
        <span className="text-primary">{content.highlightedText}</span>
        {parts[1]}
      </>
    )
  }

  // Auto-play functionality
  useEffect(() => {
    if (!content.carouselSettings?.autoPlay || content.testimonials.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.testimonials.length)
    }, (content.carouselSettings.autoPlayInterval || 5) * 1000)

    return () => clearInterval(interval)
  }, [content.carouselSettings?.autoPlay, content.carouselSettings?.autoPlayInterval, content.testimonials.length])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % content.testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + content.testimonials.length) % content.testimonials.length)
  }

  // Get avatar URL with optimization
  const getAvatarUrl = (testimonial: any) => {
    if (testimonial.avatar?.asset?.url) {
      // If it's a Sanity image, use urlFor for optimization
      if (testimonial.avatar.asset.url.includes('sanity')) {
        return urlFor(testimonial.avatar).width(80).height(80).quality(90).url()
      }
      // If it's a placeholder image, use as-is
      return testimonial.avatar.asset.url
    }
    return null
  }

  // Don't render if no testimonials
  if (!content.testimonials || content.testimonials.length === 0) {
    return null
  }

  const currentTestimonial = content.testimonials[activeIndex]

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {content.badgeText && (
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              {content.badgeText}
            </span>
          )}
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            {renderHeadline()}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 relative max-w-4xl mx-auto"
        >
          <div className="relative bg-card rounded-3xl border border-border p-8 sm:p-12">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />

            <div className="relative z-10">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-xl sm:text-2xl text-foreground leading-relaxed text-center"
              >
                &ldquo;{currentTestimonial.quote}&rdquo;
              </motion.p>

              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 text-center"
              >
                {/* Avatar (if available) */}
                {getAvatarUrl(currentTestimonial) && (
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={getAvatarUrl(currentTestimonial)!}
                        alt={currentTestimonial.avatar?.alt || `${currentTestimonial.author} profile photo`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className="font-semibold text-foreground">{currentTestimonial.author}</div>
                <div className="text-sm text-muted-foreground">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </div>
                
                {/* Featured badge */}
                {currentTestimonial.featured && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      ⭐ Featured
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Navigation */}
            {content.testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                {/* Previous/Next buttons */}
                {content.carouselSettings?.showNavigation !== false && (
                  <>
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {content.carouselSettings?.showDots !== false && (
                  <div className="flex gap-2">
                    {content.testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === activeIndex ? "w-6 bg-primary" : "bg-muted-foreground/30"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Next button */}
                {content.carouselSettings?.showNavigation !== false && (
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}