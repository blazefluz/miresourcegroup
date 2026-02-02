"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Wrench, Package, Truck, BarChart3, Lightbulb, Headphones } from "lucide-react"
import type { HeaderContent } from "@/types/sanity"

interface HeaderClientProps {
  content: HeaderContent
}

// Services mega menu data structure
const servicesMenu = {
  items: [
    {
      icon: Wrench,
      title: "Engineering Services",
      href: "/services/engineering",
      subcategories: [
        { name: "Process Engineering", href: "/services/engineering/process" },
        { name: "Mechanical Design", href: "/services/engineering/mechanical" },
        { name: "Electrical Systems", href: "/services/engineering/electrical" },
        { name: "Instrumentation", href: "/services/engineering/instrumentation" },
      ]
    },
    {
      icon: Package,
      title: "Procurement",
      href: "/services/procurement",
      subcategories: [
        { name: "Equipment Sourcing", href: "/services/procurement/equipment" },
        { name: "Vendor Management", href: "/services/procurement/vendors" },
        { name: "Quality Assurance", href: "/services/procurement/quality" },
        { name: "Contract Negotiation", href: "/services/procurement/contracts" },
      ]
    },
    {
      icon: BarChart3,
      title: "Supply Chain",
      href: "/services/supply-chain",
      subcategories: [
        { name: "Inventory Management", href: "/services/supply-chain/inventory" },
        { name: "Warehousing", href: "/services/supply-chain/warehousing" },
        { name: "Distribution", href: "/services/supply-chain/distribution" },
        { name: "Optimization", href: "/services/supply-chain/optimization" },
      ]
    },
    {
      icon: Truck,
      title: "Logistics",
      href: "/services/logistics",
      subcategories: [
        { name: "Transportation", href: "/services/logistics/transportation" },
        { name: "Freight Forwarding", href: "/services/logistics/freight" },
        { name: "Customs Clearance", href: "/services/logistics/customs" },
        { name: "Last Mile Delivery", href: "/services/logistics/delivery" },
      ]
    },
    {
      icon: Lightbulb,
      title: "Consulting",
      href: "/services/consulting",
      subcategories: [
        { name: "Strategic Planning", href: "/services/consulting/strategy" },
        { name: "Operations Optimization", href: "/services/consulting/operations" },
        { name: "Risk Management", href: "/services/consulting/risk" },
        { name: "Compliance", href: "/services/consulting/compliance" },
      ]
    },
    {
      icon: Headphones,
      title: "Operations Support",
      href: "/services/operations",
      subcategories: [
        { name: "Maintenance Services", href: "/services/operations/maintenance" },
        { name: "Technical Support", href: "/services/operations/technical" },
        { name: "Field Services", href: "/services/operations/field" },
        { name: "Emergency Response", href: "/services/operations/emergency" },
      ]
    },
  ]
}

export default function HeaderClient({ content }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState<number>(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const servicesLinkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        servicesLinkRef.current &&
        !servicesLinkRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-3 text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-1 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
              <img 
                src="/MIResourcesLogo.png" 
                alt="M.I Resource Group Logo" 
                className="h-8 w-auto"
              />
            </div>
            <div>
              <span className="text-primary">{content.brandName.primary}</span>{" "}
              <span className="text-foreground">{content.brandName.secondary}</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {content.navigation.map((link, index) => {
              const isServicesLink = link.name.toLowerCase() === 'services'
              
              if (isServicesLink) {
                return (
                  <div key={link.name} className="relative" ref={servicesLinkRef}>
                    <motion.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </motion.button>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          ref={dropdownRef}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseLeave={() => setServicesDropdownOpen(false)}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                        >
                          <div className="flex">
                            {/* Left Side - Service Icons Grid */}
                            <div className="w-1/3 bg-muted/30 border-r border-border p-6">
                              <div className="grid grid-cols-2 gap-3">
                                {servicesMenu.items.map((service, idx) => {
                                  const IconComponent = service.icon
                                  return (
                                    <motion.button
                                      key={idx}
                                      onMouseEnter={() => setHoveredService(idx)}
                                      onClick={() => {
                                        window.location.href = service.href
                                        setServicesDropdownOpen(false)
                                      }}
                                      className={`p-4 rounded-lg transition-all duration-200 text-left ${
                                        hoveredService === idx
                                          ? 'bg-primary/10 border-primary/40'
                                          : 'bg-background/50 border-transparent hover:bg-background'
                                      } border`}
                                    >
                                      <IconComponent 
                                        size={24} 
                                        className={`mb-2 ${hoveredService === idx ? 'text-primary' : 'text-muted-foreground'}`}
                                      />
                                      <div className={`text-xs font-medium ${hoveredService === idx ? 'text-primary' : 'text-foreground'}`}>
                                        {service.title}
                                      </div>
                                    </motion.button>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Right Side - Subcategories */}
                            <div className="w-2/3 p-6">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={hoveredService}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                                    {(() => {
                                      const IconComponent = servicesMenu.items[hoveredService].icon
                                      return <IconComponent size={20} className="text-primary" />
                                    })()}
                                    <h3 className="text-lg font-semibold text-foreground">
                                      {servicesMenu.items[hoveredService].title}
                                    </h3>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-3">
                                    {servicesMenu.items[hoveredService].subcategories.map((sub, subIdx) => (
                                      <motion.a
                                        key={subIdx}
                                        href={sub.href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: subIdx * 0.05 }}
                                        onClick={() => setServicesDropdownOpen(false)}
                                        className="flex items-start gap-2 p-3 rounded-lg hover:bg-muted transition-colors group"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary mt-1.5 shrink-0" />
                                        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                          {sub.name}
                                        </span>
                                      </motion.a>
                                    ))}
                                  </div>
                                </motion.div>
                              </AnimatePresence>

                              {/* View All Services Link */}
                              <div className="mt-6 pt-4 border-t border-border">
                                <a
                                  href="/services"
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                  View All Services
                                  <ChevronDown size={16} className="-rotate-90" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              )
            })}
            <motion.a
              href={content.ctaButton.url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {content.ctaButton.text}
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 flex flex-col gap-4">
                {content.navigation.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href={content.ctaButton.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 px-5 py-3 bg-primary text-primary-foreground rounded-full text-center font-medium"
                >
                  {content.ctaButton.text}
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}