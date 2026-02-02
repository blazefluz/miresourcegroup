"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What services does M.I Resource Services Ltd provide?",
    answer: "We provide comprehensive support services for Nigeria's Oil & Gas industry, including Engineering & Procurement, Supply Chain Management, Logistics Solutions, Equipment Rental, and Management Consulting Services."
  },
  {
    question: "What industries do you serve?",
    answer: "We primarily serve the Oil & Gas sector in Nigeria, including upstream, midstream, and downstream operations. We work with international oil companies, indigenous operators, and service companies."
  },
  {
    question: "Are you ISO certified?",
    answer: "Yes, we are ISO 9001:2015 certified, demonstrating our commitment to international quality management standards and continuous improvement in our service delivery."
  },
  {
    question: "How can I request a quote for services?",
    answer: "You can request a quote by filling out our contact form above, sending an email to info@miresourcegroup.com, or calling our office directly. Our team will respond within 24 hours with a detailed proposal."
  },
  {
    question: "Do you provide emergency support services?",
    answer: "Yes, we offer 24/7 emergency support services for critical operations. Contact our emergency hotline for immediate assistance with urgent requirements."
  },
  {
    question: "What is your service coverage area?",
    answer: "We operate throughout Nigeria with offices in Lagos and Port Harcourt. We have the capability to mobilize equipment and personnel to any location within Nigeria and neighboring countries."
  }
]

export function ContactFAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
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
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Quick answers to common inquiries
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <span className="text-lg font-semibold text-foreground pr-4">
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
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
