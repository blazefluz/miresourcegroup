"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

const offices = [
  {
    name: "Lagos Office (Head Office)",
    address: "123 Industrial Avenue, Apapa, Lagos State, Nigeria",
    phone: "+234 (0) 803 XXX XXXX",
    email: "lagos@miresourcegroup.com",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM"
  },
  {
    name: "Port Harcourt Office",
    address: "456 Trans Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria",
    phone: "+234 (0) 805 XXX XXXX",
    email: "portharcourt@miresourcegroup.com",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM"
  }
]

export function OfficeLocations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Locations
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Visit Our <span className="text-primary">Offices</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're strategically located to serve you better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {office.name}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Address</p>
                      <p className="text-muted-foreground">{office.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Phone</p>
                      <a href={`tel:${office.phone}`} className="text-primary hover:underline">
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Email</p>
                      <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                        {office.email}
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Business Hours:</span> {office.hours}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
