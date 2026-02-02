"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/miresourcegroup",
    color: "hover:bg-[#0A66C2]"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/miresourcegroup",
    color: "hover:bg-[#1877F2]"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/miresourcegroup",
    color: "hover:bg-[#1DA1F2]"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/miresourcegroup",
    color: "hover:bg-[#E4405F]"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@miresourcegroup",
    color: "hover:bg-[#FF0000]"
  }
]

export function SocialMediaLinks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-3">
            Connect With Us
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Follow us on social media for updates and industry insights
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon
              
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white hover:border-transparent group`}
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
