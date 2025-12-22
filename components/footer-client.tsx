"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import type { FooterContent } from "@/types/sanity"

interface FooterClientProps {
  content: FooterContent
}

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
}

export default function FooterClient({ content }: FooterClientProps) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="text-2xl font-bold tracking-tight">
              <span className="text-primary">{content.brandName.primary}</span>{" "}
              <span className="text-foreground">{content.brandName.secondary}</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {content.tagline}
            </p>
            {content.socialLinks && content.socialLinks.length > 0 && (
              <div className="mt-6 flex gap-4">
                {content.socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.platform as keyof typeof socialIconMap]
                  if (!IconComponent) return null
                  
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label={social.platform}
                    >
                      <IconComponent size={18} />
                    </motion.a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {content.footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {content.copyright.companyName}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed by{" "}
            <a 
              href="https://x.com/Alsoknownaszac" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              @Alsoknownaszac
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}