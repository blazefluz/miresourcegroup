"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What services does M.I Resource Services Ltd provide?",
    answer: "We provide comprehensive support services including Engineering & Procurement, Supply Chain Management, Logistics Services, Management Services, and Construction & Maintenance. Our services cover everything from fabrication and instrumentation to equipment rental and project management."
  },
  {
    question: "Are you ISO certified?",
    answer: "Yes, we have adopted international ISO 9001 standards as our standard for quality management and assurance. This certification demonstrates our commitment to maintaining the highest quality standards in all our operations."
  },
  {
    question: "What is your approach to safety?",
    answer: "Safety is our top priority. We operate under the principle that 'ALL ACCIDENTS ARE PREVENTABLE.' We maintain the highest safety standards and will not compromise our safety standards to achieve other corporate goals. All personnel undergo comprehensive safety orientation and training."
  },
  {
    question: "Do you offer turnkey solutions?",
    answer: "Yes, we offer complete turnkey solutions. We can manage the entire design and delivery process to ensure execution costs meet required budgets. Our internal strength allows us to offer services either as a total package or as customized groupings of individual packages."
  },
  {
    question: "What equipment and facilities do you have?",
    answer: "We have a wide range of facilities including excavators, CAT 966C Wheel Loaders, concrete mixers, dump trucks, water tankers, vibrating rollers, pavers, welding machines, Toyota Hilux trucks, Hiace buses, and specialized trailers for logistics operations."
  },
  {
    question: "How can I request a quote or start a project?",
    answer: "You can contact us through our contact form, email info@miresourcegroup.com, or call +234 807 117 3927. For direct inquiries, reach out to our Administrator, Ojeisekhoba Divine at +234 815 927 1443 or info@miresourcegroup.com."
  },
  {
    question: "What makes M.I Resources different from competitors?",
    answer: "We are a privately owned indigenous Nigerian company with deep understanding of local market dynamics, combined with global standards. We have strategic alliances with specialized companies worldwide, ISO 9001 certification, and operate with the Kaizen continuous improvement methodology."
  },
  {
    question: "Do you provide emergency response services?",
    answer: "Yes, we maintain emergency response capability to react quickly and effectively against deviations. We offer 24/7 support for critical operations to ensure operational continuity."
  }
]

export function ContactFAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-secondary/20" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to know about our services
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <span className="text-base font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center p-8 bg-primary/5 rounded-2xl border border-primary/20"
        >
          <p className="text-foreground font-medium mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:info@miresourcegroup.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  )
}
