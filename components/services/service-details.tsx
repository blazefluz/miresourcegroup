"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Wrench, Package, BarChart3, Truck, Lightbulb, HardHat, CheckCircle2, ArrowRight, Users, Radio } from "lucide-react"

const services = [
  {
    icon: Wrench,
    title: "Engineering Services",
    tagline: "Comprehensive engineering solutions across multiple disciplines",
    description: "M.I Resources has comprehensive engineering resources covering a wide expanse of disciplines and work-projects in Civil, Mechanical, Fabrication and Structural Engineering. Our teams are supported by the latest technology and software in engineering and structural design.",
    features: [
      "Construction and Maintenance - Turnkey infrastructure and industrial project implementation",
      "Civil Engineering Design - Heavy Civil Construction, Road Works, Commercial & Industrial",
      "Mechanical & Fabrication - Deck Extensions, Subsea Templates, Masts & Substructures",
      "Welding Services - Large/Small Bore Piping (Stainless Steel, Carbon, Duplex)",
      "Electrical & Instrumentation, Mud Systems, Drilling Structures",
      "Oil Field Services with latest technology support",
      "Welding Processes: SMAW, Orbital, TIG, SAW"
    ],
    image: "/portrait-native-american-engineer-technician-wearing-safty-uniform-hand-contril-automation-robot-arm-welding-machine-with-laptop-industrial-40-factory-background-concept.jpg",
    color: "text-blue-500",
    bgColor: "bg-blue-500"
  },
  {
    icon: Package,
    title: "Procurement Services",
    tagline: "Strategic sourcing and procurement solutions",
    description: "We deliver proven procurement strategies and solutions which holistically reduce supply chain costs and deliver high-quality materials that meet your specific requirements. Our deep network of alliances across the globe ensures access to the right sources.",
    features: [
      "Equipment & Material Supply",
      "Petroleum Products & Lubricants, Oil Filters, Consumables",
      "PPE & Safety Equipment",
      "Flanges, Valves, Fittings, Pipes, Bolts & Nuts, Electrical & Lighting",
      "Marine & Oil Tools",
      "Office, Drilling and Industrial Equipment & fittings",
      "Chandelling Services",
      "Authorized OEM Distributors & Third-Party Quality Inspectors",
      "Global Sourcing Network with Freight Forwarders"
    ],
    image: "/warehouse-employees-putting-boxes-desk-ready-shipment.jpg",
    color: "text-green-500",
    bgColor: "bg-green-500"
  },
  {
    icon: BarChart3,
    title: "Supply Chain Management",
    tagline: "End-to-end supply chain optimization",
    description: "Our Supply Chain Management team possesses adequate logistics intervention with a well-tailored system. We operate the Kaizen-style ideology which seeks proactive measures to continually improve the supply chain and reduce deviations to industry minimums.",
    features: [
      "Professional Inspection Services - Client Specification Conformance",
      "Production Management - Timely & Effective Flow of Goods",
      "7 Rs of Logistics: Right Product, Customer, Quantity, Condition, Place, Time, Cost",
      "Distribution & Delivery - End-to-End Tracking",
      "Material Conveyance from Point of Purchase to End User",
      "Kaizen Continuous Improvement Methodology"
    ],
    image: "/black-team-manufacturing-plant-employees-fixing-errors-debugging.jpg",
    color: "text-purple-500",
    bgColor: "bg-purple-500"
  },
  {
    icon: Truck,
    title: "Marine & Logistics Services",
    tagline: "Comprehensive logistics and transportation solutions",
    description: "Our logistics services ensure getting the right product to the right customer, in the right quantity, in the right condition, at the right place, at the right time, and at the right cost. We operate the 7 Rs of logistics framework.",
    features: [
      "Marine Logistics - Offshore supply and maritime transportation services",
      "Fleet Management - Comprehensive vehicle and equipment management",
      "Navigation Maintenance and Management - Maritime navigation systems and support",
      "Motor Tanker Vehicles - Specialized tanker fleet for petroleum products",
      "Transportation Fleet: Toyota Hilux Trucks, Hiace Buses, Self Loader Trucks (8 Tons)",
      "Heavy Haulage: Low Boy Mark Trailers, 20 Tons Dump Trucks",
      "Support Services: 3000 GL Water Tankers, Light Vehicles",
      "Material Distribution & Last Mile Delivery",
      "24/7 Availability with Rapid Response Capability",
      "Nationwide Coverage Across Nigeria"
    ],
    image: "/cargo-ship-loading-commercial-port.jpg",
    color: "text-orange-500",
    bgColor: "bg-orange-500"
  },
  {
    icon: Lightbulb,
    title: "Management Services",
    tagline: "Professional management and consulting services",
    description: "M.I Resources offers business administration and management services for clients in both large and small-scale businesses. Our experienced project management team handles projects on large scale involving a diversity of disciplines with clear structure and progress tracking.",
    features: [
      "Environmental Management - E.I.A (Environmental Inspection Analysis)/Oil Spill/Clean up, Compliance, Waste Management, Sustainability",
      "Project Management - Large-Scale Multi-Discipline Coordination",
      "Business Management Solutions and Administration - Process Optimization & Operational Management",
      "Strategic Planning and Implementation",
      "Budget Management",
      "Clear Structure with Progress Monitoring"
    ],
    image: "/african-man-black-suit.jpg",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500"
  },
  {
    icon: Radio,
    title: "Marine Electronics",
    tagline: "Professional marine electronics sales, installation, and maintenance",
    description: "Our scope of services covers the sales, installation, repairs, maintenance, and support of marine electronic equipment. Our engineers are OEM-certified and trained by service partners, providing services both in port and at sea, ensuring reliable and professional support at all times.",
    features: [
      "VSAT Internet Systems - New hardware installation, repairs, routine maintenance, and internet subscription",
      "GMDSS Systems - New hardware installation, repairs, reprogramming, routine maintenance, subscription, and activation of distress alert services",
      "VDR / SVDR Systems - New hardware installation, repairs, programming of Data Acquisition Units and Capsules",
      "Class-Approved Radio Surveyors - Annual Radio Surveys and VDR Annual Performance Tests on vessels trading throughout West African countries",
      "Navigation Systems - Installation, repairs, and routine maintenance of Radar, Autopilot, ECDIS, Gyrocompass, GPS",
      "Dynamic Positioning Systems - Repairs and routine maintenance",
      "OEM-Certified Engineers - Professional support both in port and at sea"
    ],
    image: "/automated-factory-employee-manages-industrial-automation-system.jpg",
    color: "text-cyan-600",
    bgColor: "bg-cyan-600"
  },
  {
    icon: CheckCircle2,
    title: "Sales and Distribution",
    tagline: "Strategic sales and distribution network solutions",
    description: "M.I Resources provides comprehensive sales and distribution services, leveraging our extensive network and logistics capabilities to ensure efficient market reach and customer satisfaction across Nigeria's Oil & Gas sector.",
    features: [
      "Products and Services - Comprehensive portfolio of Oil & Gas solutions",
      "Sales Strategy Development - Market Analysis & Customer Targeting",
      "Distribution Network Management - Nationwide Coverage & Optimization",
      "Market Development - New Territory Expansion & Market Penetration",
      "Customer Relations - Account Management & Support Services",
      "Order Fulfillment - Efficient Processing & Delivery Coordination",
      "Channel Management - Multi-Channel Distribution Strategy"
    ],
    image: "/medium-shot-man-talking-phone.jpg",
    color: "text-teal-500",
    bgColor: "bg-teal-500"
  },
  {
    icon: Users,
    title: "Human Capacity Development/Training",
    tagline: "Professional development and capacity building programs",
    description: "M.I Resources offers comprehensive training and development programs designed to enhance workforce capabilities, improve performance, and build sustainable competitive advantage through continuous learning and skill development.",
    features: [
      "Leadership & Management - Executive development and team leadership skills",
      "Policy Making & Strategic Implementation - Strategic planning and execution",
      "Work Performance/Productivity Enhancement - Efficiency and output optimization",
      "Sales & Marketing - Customer engagement and market strategies",
      "Negotiations & Conflict Resolution - Effective communication and problem-solving",
      "Supply Chain Management (SCM) - End-to-end logistics optimization",
      "Soft Skills & Support Services - Communication, teamwork, and interpersonal skills",
      "A.I, Business & Systems Automation - Digital transformation and technology adoption",
      "Human Resource Management - Personnel development and organizational behavior",
      "Stress Management & Work Life Balance - Wellness and productivity programs",
      "Safety & Quality Assurance Training - Compliance and best practices",
      "Emotional Intelligence & Health Education - Personal development and wellbeing"
    ],
    image: "/industrial-designers-working-3d-model.jpg",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500"
  }
]

export function ServiceDetails() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Service Portfolio
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Comprehensive <span className="text-primary">Solutions</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Full-spectrum support services backed by experienced teams, modern equipment, and proven methodologies for Nigeria's Oil & Gas industry
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isActive = activeTab === index
            
            return (
              <motion.button
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? `${service.bgColor} text-white shadow-lg`
                    : 'bg-card text-foreground border border-border hover:border-primary/40'
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{service.title}</span>
                <span className="sm:hidden text-xs">{service.title.split(' ')[0]}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Service Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Image */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={services[activeTab].image}
                alt={services[activeTab].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:via-black/30 lg:to-transparent" />
              
              {/* Icon Overlay */}
              <div className="absolute bottom-6 left-6 lg:top-6 lg:bottom-auto">
                {(() => {
                  const IconComponent = services[activeTab].icon
                  return (
                    <div className={`w-16 h-16 rounded-2xl ${services[activeTab].bgColor} flex items-center justify-center shadow-2xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {services[activeTab].title}
                </h3>
                <p className={`text-xs sm:text-sm font-semibold ${services[activeTab].color} mb-3 sm:mb-4`}>
                  {services[activeTab].tagline}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {services[activeTab].description}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                  Key Capabilities & Features
                </h4>
                <div className="grid gap-3">
                  {services[activeTab].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${services[activeTab].color} shrink-0 mt-0.5`} />
                      <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Request This Service
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 bg-primary/5 rounded-2xl border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">
                Need a Custom Solution?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We offer turnkey packages or customized groupings of individual services tailored to your specific needs
              </p>
            </div>
            <a
              href="/contact"
              className="w-full md:w-auto shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap text-center"
            >
              Discuss Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
