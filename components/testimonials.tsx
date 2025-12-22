"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "M.I Resource Group has been instrumental in optimizing our supply chain operations. Their professionalism and expertise are unmatched in the industry.",
    author: "Adebayo Johnson",
    role: "Operations Director",
    company: "Nigerian Oil Corp",
  },
  {
    quote:
      "We've partnered with M.I Resource for over 5 years, and they consistently deliver exceptional results. Their engineering team is top-notch.",
    author: "Sarah Okonkwo",
    role: "Procurement Manager",
    company: "Energy Solutions Ltd",
  },
  {
    quote:
      "The management services provided by M.I Resource Group transformed our operational efficiency. Highly recommended for any energy company.",
    author: "Michael Eze",
    role: "CEO",
    company: "Delta Oil Services",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            What Our <span className="text-primary">Clients Say</span>
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
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </motion.p>

              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 text-center"
              >
                <div className="font-semibold text-foreground">{testimonials[activeIndex].author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
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
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
