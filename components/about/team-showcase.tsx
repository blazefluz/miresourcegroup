"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"

const team = [
  {
    name: "Leadership Team",
    role: "Executive Management",
    image: "/portrait-smiling-male-worker-wearing-hard-hat-warehouse.jpg",
    description: "Experienced professionals leading our strategic vision"
  },
  {
    name: "Engineering Team",
    role: "Technical Experts",
    image: "/view-male-engineer-work-engineers-day-celebration.jpg",
    description: "Skilled engineers delivering innovative solutions"
  },
  {
    name: "Operations Team",
    role: "Field Specialists",
    image: "/young-african-american-builder-man-wearing-construction-vest-safety-helmet-with-smile-face-showing-thumb-up-standing.jpg",
    description: "Dedicated professionals ensuring project success"
  }
]

export function TeamShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our People
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Dedicated professionals committed to delivering excellence in every project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Social links overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                      <Linkedin className="w-5 h-5 text-primary-foreground" />
                    </button>
                    <button className="p-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <div className="text-primary font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
