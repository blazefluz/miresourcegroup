"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Wrench, Package, Truck, BarChart3, Lightbulb, CheckCircle2, Users } from "lucide-react"
import type { HeaderContent } from "@/types/sanity"

interface HeaderClientProps {
  content: HeaderContent
}

// Services mega menu data structure - Based on actual company services
const servicesMenu = {
  items: [
    {
      icon: Wrench,
      title: "Engineering Services",
      href: "/services",
      subcategories: [
        { name: "Construction & Maintenance", href: "/services" },
        { name: "Mechanical & Civil Works", href: "/services" },
        { name: "Fabrication & Instrumentation", href: "/services" },
        { name: "Oil Field Services", href: "/services" },
        { name: "Structural Engineering", href: "/services" },
        { name: "Electrical & Instrumentation", href: "/services" },
        { name: "Welding Services", href: "/services" },
      ]
    },
    {
      icon: Package,
      title: "Procurement Services",
      href: "/services",
      subcategories: [
        { name: "Office, Drilling and Industrial Equipment & fittings", href: "/services" },
        { name: "Equipment & Material Supply", href: "/services" },
        { name: "Petroleum Products & Lubricants", href: "/services" },
        { name: "Marine & Oil Tools", href: "/services" },
        { name: "PPE & Safety Equipment", href: "/services" },
        { name: "Flanges, Valves, Fittings & Pipes", href: "/services" },
        { name: "Chandelling Services", href: "/services" },
      ]
    },
    {
      icon: BarChart3,
      title: "Supply Chain Management",
      href: "/services",
      subcategories: [
        { name: "Production Management", href: "/services" },
        { name: "Distribution & Deliveries", href: "/services" },
        { name: "Quality Inspection", href: "/services" },
        { name: "Inventory Management", href: "/services" },
        { name: "Warehousing Solutions", href: "/services" },
        { name: "Material Dispatch", href: "/services" },
      ]
    },
    {
      icon: Truck,
      title: "Logistics Services",
      href: "/services",
      subcategories: [
        { name: "Marine Logistics", href: "/services" },
        { name: "Fleet Management", href: "/services" },
        { name: "Navigation Maintenance and Management", href: "/services" },
        { name: "Motor Tanker Vehicles", href: "/services" },
        { name: "Material Transportation", href: "/services" },
        { name: "Heavy Equipment Haulage", href: "/services" },
        { name: "Freight Management", href: "/services" },
        { name: "Last Mile Delivery", href: "/services" },
        { name: "Fleet Management", href: "/services" },
        { name: "Customs Clearance", href: "/services" },
      ]
    },
    {
      icon: Lightbulb,
      title: "Management Services",
      href: "/services",
      subcategories: [
        { name: "Environmental Management - E.I.A/Oil Spill/Clean up", href: "/services" },
        { name: "Project Management", href: "/services" },
        { name: "Business Administration", href: "/services" },
        { name: "Industrial Management", href: "/services" },
        { name: "Strategic Planning", href: "/services" },
      ]
    },
    {
      icon: CheckCircle2,
      title: "Sales and Distribution",
      href: "/services",
      subcategories: [
        { name: "Products and Services", href: "/services" },
        { name: "Sales Strategy Development", href: "/services" },
        { name: "Distribution Network Management", href: "/services" },
        { name: "Market Development", href: "/services" },
        { name: "Customer Relations", href: "/services" },
        { name: "Order Fulfillment", href: "/services" },
        { name: "Channel Management", href: "/services" },
      ]
    },
    {
      icon: Users,
      title: "Human Capacity Development/Training",
      href: "/services",
      subcategories: [
        { name: "Leadership & Management", href: "/services" },
        { name: "Policy Making & Strategic Implementation", href: "/services" },
        { name: "Work Performance/Productivity Enhancement", href: "/services" },
        { name: "Sales & Marketing", href: "/services" },
        { name: "Negotiations & Conflict Resolution", href: "/services" },
        { name: "Supply Chain Management (SCM)", href: "/services" },
        { name: "Soft Skills & Support Services", href: "/services" },
        { name: "A.I, Business & Systems Automation", href: "/services" },
        { name: "Human Resource Management", href: "/services" },
        { name: "Stress Management & Work Life Balance", href: "/services" },
        { name: "Safety & Quality Assurance Training", href: "/services" },
        { name: "Emotional Intelligence & Health Education", href: "/services" },
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
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="/"
            className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-1 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
              <img 
                src="/MIResourcesLogo.png" 
                alt="M.I Resource Group Logo" 
                className="h-8 sm:h-9 lg:h-10 w-auto"
              />
            </div>
            <div className="hidden sm:block">
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
                      className="text-sm text-foreground/90 hover:text-foreground transition-colors relative group flex items-center gap-1 font-medium"
                      style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}
                    >
                      {link.name}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </motion.button>

                    {/* Mega Menu Dropdown - Traditional Modern Design */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          ref={dropdownRef}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseLeave={() => setServicesDropdownOpen(false)}
                          className="absolute top-full left-1/2 -translate-x-[60%] mt-2 w-[1200px] bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
                        >
                          <div className="flex">
                            {/* Left Sidebar - Categories */}
                            <div className="w-80 bg-muted/40 border-r border-border">
                              <div className="p-6">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                                  Services we offer
                                </h3>
                                <nav className="space-y-1">
                                  {servicesMenu.items.map((service, idx) => {
                                    const IconComponent = service.icon
                                    return (
                                      <button
                                        key={idx}
                                        onMouseEnter={() => setHoveredService(idx)}
                                        onClick={() => {
                                          window.location.href = service.href
                                          setServicesDropdownOpen(false)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                                          hoveredService === idx
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-foreground hover:bg-background'
                                        }`}
                                      >
                                        <IconComponent size={18} className={hoveredService === idx ? '' : 'text-muted-foreground'} />
                                        <span className="font-medium">{service.title}</span>
                                      </button>
                                    )
                                  })}
                                </nav>
                              </div>
                            </div>

                            {/* Right Content - Subcategories */}
                            <div className="flex-1 p-8">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={hoveredService}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {/* Category Header */}
                                  <div className="mb-5">
                                    <div className="flex items-center gap-2 mb-2">
                                      {(() => {
                                        const IconComponent = servicesMenu.items[hoveredService].icon
                                        return <IconComponent size={20} className="text-primary" />
                                      })()}
                                      <h4 className="text-lg font-bold text-foreground">
                                        {servicesMenu.items[hoveredService].title}
                                      </h4>
                                    </div>
                                    <div className="h-px bg-linear-to-r from-primary/50 to-transparent" />
                                  </div>

                                  {/* Subcategories List */}
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                    {servicesMenu.items[hoveredService].subcategories.map((sub, subIdx) => (
                                      <motion.div
                                        key={subIdx}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: subIdx * 0.03 }}
                                        className="flex items-center gap-2.5 py-2 px-3"
                                      >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                        <span className="text-sm text-muted-foreground">
                                          {sub.name}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>

                                  {/* View Category Link */}
                                  <div className="mt-6 pt-4 border-t border-border">
                                    <a
                                      href="/services"
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                    >
                                      View {servicesMenu.items[hoveredService].title}
                                      <ChevronDown size={14} className="-rotate-90" />
                                    </a>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="bg-muted/30 px-6 py-3 border-t border-border flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              Explore our comprehensive service offerings
                            </p>
                            <a
                              href="/services"
                              onClick={() => setServicesDropdownOpen(false)}
                              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors uppercase tracking-wide"
                            >
                              View All Services →
                            </a>
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
                  className="text-sm text-foreground/90 hover:text-foreground transition-colors relative group font-medium"
                  style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}
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
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border mt-4 rounded-b-lg"
            >
              <div className="py-6 px-4 flex flex-col gap-4">
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