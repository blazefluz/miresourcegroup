"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  const items = [
    "No.1 Support Services Provider",
    "Oil & Gas Excellence",
    "Engineering & Procurement",
    "Supply Chain Management",
    "Trusted Partner",
  ]

  return (
    <div className="relative py-4 bg-primary/5 border-y border-primary/10 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={index} className="text-sm font-medium text-primary/80 flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
