#!/usr/bin/env node

// Migrate all services from hardcoded data to Sanity
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Complete service data extracted from components
const servicesData = [
  {
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
    imagePath: "public/portrait-native-american-engineer-technician-wearing-safty-uniform-hand-contril-automation-robot-arm-welding-machine-with-laptop-industrial-40-factory-background-concept.jpg",
    iconName: "Wrench",
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    subcategories: [
      { name: "Construction & Maintenance", href: "/services", order: 1 },
      { name: "Mechanical & Civil Works", href: "/services", order: 2 },
      { name: "Fabrication & Instrumentation", href: "/services", order: 3 },
      { name: "Oil Field Services", href: "/services", order: 4 },
      { name: "Structural Engineering", href: "/services", order: 5 },
      { name: "Electrical & Instrumentation", href: "/services", order: 6 },
      { name: "Welding Services", href: "/services", order: 7 },
    ],
    order: 1
  },
  {
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
    imagePath: "public/warehouse-employees-putting-boxes-desk-ready-shipment.jpg",
    iconName: "Package",
    color: "text-green-500",
    bgColor: "bg-green-500",
    subcategories: [
      { name: "Equipment & Material Supply", href: "/services", order: 1 },
      { name: "Petroleum Products & Lubricants", href: "/services", order: 2 },
      { name: "PPE & Safety Equipment", href: "/services", order: 3 },
      { name: "Flanges, Valves, Fittings & Pipes", href: "/services", order: 4 },
      { name: "Marine & Oil Tools", href: "/services", order: 5 },
      { name: "Office, Drilling and Industrial Equipment & fittings", href: "/services", order: 6 },
      { name: "Chandelling Services", href: "/services", order: 7 },
    ],
    order: 2
  },
  {
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
    imagePath: "public/black-team-manufacturing-plant-employees-fixing-errors-debugging.jpg",
    iconName: "BarChart3",
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    subcategories: [
      { name: "Production Management", href: "/services", order: 1 },
      { name: "Distribution & Deliveries", href: "/services", order: 2 },
      { name: "Quality Inspection", href: "/services", order: 3 },
      { name: "Inventory Management", href: "/services", order: 4 },
      { name: "Warehousing Solutions", href: "/services", order: 5 },
      { name: "Material Dispatch", href: "/services", order: 6 },
    ],
    order: 3
  },
  {
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
    imagePath: "public/cargo-ship-loading-commercial-port.jpg",
    iconName: "Truck",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    subcategories: [
      { name: "Marine Logistics", href: "/services", order: 1 },
      { name: "Fleet Management", href: "/services", order: 2 },
      { name: "Navigation Maintenance and Management", href: "/services", order: 3 },
      { name: "Motor Tanker Vehicles", href: "/services", order: 4 },
      { name: "Material Transportation", href: "/services", order: 5 },
      { name: "Heavy Equipment Haulage", href: "/services", order: 6 },
      { name: "Freight Management", href: "/services", order: 7 },
      { name: "Last Mile Delivery", href: "/services", order: 8 },
      { name: "Customs Clearance", href: "/services", order: 9 },
    ],
    order: 4
  },
  {
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
    imagePath: "public/african-man-black-suit.jpg",
    iconName: "Lightbulb",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500",
    subcategories: [
      { name: "Environmental Management - E.I.A/Oil Spill/Clean up", href: "/services", order: 1 },
      { name: "Project Management", href: "/services", order: 2 },
      { name: "Business Management Solutions and Administration", href: "/services", order: 3 },
      { name: "Industrial Management", href: "/services", order: 4 },
      { name: "Strategic Planning and Implementation", href: "/services", order: 5 },
      { name: "Budget Management", href: "/services", order: 6 },
    ],
    order: 5
  },
  {
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
    imagePath: "public/automated-factory-employee-manages-industrial-automation-system.jpg",
    iconName: "Radio",
    color: "text-cyan-600",
    bgColor: "bg-cyan-600",
    subcategories: [
      { name: "VSAT Internet Systems", href: "/services", order: 1 },
      { name: "GMDSS Systems", href: "/services", order: 2 },
      { name: "VDR / SVDR Systems", href: "/services", order: 3 },
      { name: "Navigation Systems (Radar, Autopilot, ECDIS, Gyrocompass, GPS)", href: "/services", order: 4 },
      { name: "Dynamic Positioning Systems", href: "/services", order: 5 },
      { name: "Annual Radio Surveys & VDR Performance Tests", href: "/services", order: 6 },
    ],
    order: 6
  },
  {
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
    imagePath: "public/medium-shot-man-talking-phone.jpg",
    iconName: "CheckCircle2",
    color: "text-teal-500",
    bgColor: "bg-teal-500",
    subcategories: [
      { name: "Products and Services", href: "/services", order: 1 },
      { name: "Sales Strategy Development", href: "/services", order: 2 },
      { name: "Distribution Network Management", href: "/services", order: 3 },
      { name: "Market Development", href: "/services", order: 4 },
      { name: "Customer Relations", href: "/services", order: 5 },
      { name: "Order Fulfillment", href: "/services", order: 6 },
      { name: "Channel Management", href: "/services", order: 7 },
    ],
    order: 7
  },
  {
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
    imagePath: "public/industrial-designers-working-3d-model.jpg",
    iconName: "Users",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500",
    subcategories: [
      { name: "Leadership & Management", href: "/services", order: 1 },
      { name: "Policy Making & Strategic Implementation", href: "/services", order: 2 },
      { name: "Work Performance/Productivity Enhancement", href: "/services", order: 3 },
      { name: "Sales & Marketing", href: "/services", order: 4 },
      { name: "Negotiations & Conflict Resolution", href: "/services", order: 5 },
      { name: "Supply Chain Management (SCM)", href: "/services", order: 6 },
      { name: "Soft Skills & Support Services", href: "/services", order: 7 },
      { name: "A.I, Business & Systems Automation", href: "/services", order: 8 },
      { name: "Human Resource Management", href: "/services", order: 9 },
      { name: "Stress Management & Work Life Balance", href: "/services", order: 10 },
      { name: "Safety & Quality Assurance Training", href: "/services", order: 11 },
      { name: "Emotional Intelligence & Health Education", href: "/services", order: 12 },
    ],
    order: 8
  }
]

async function uploadImage(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`   ⚠️  Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(imagePath)
    const filename = path.basename(imagePath)
    
    console.log(`   📤 Uploading image: ${filename}`)
    const uploadedImage = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    })
    
    console.log(`   ✅ Image uploaded: ${uploadedImage._id}`)
    return uploadedImage._id
  } catch (error) {
    console.error(`   ❌ Image upload failed: ${error.message}`)
    return null
  }
}

async function migrateServices() {
  console.log('🚀 Migrating services to Sanity...\n')
  console.log(`📊 Total services to migrate: ${servicesData.length}\n`)
  
  let successCount = 0
  let failCount = 0
  
  for (const service of servicesData) {
    try {
      console.log(`\n${'='.repeat(60)}`)
      console.log(`📝 Migrating: ${service.title}`)
      console.log(`${'='.repeat(60)}`)
      
      // Upload image
      const imageAssetId = await uploadImage(service.imagePath)
      
      if (!imageAssetId) {
        console.log(`   ⚠️  Skipping ${service.title} - image upload failed`)
        failCount++
        continue
      }
      
      // Create service document
      console.log(`   📄 Creating service document...`)
      const result = await client.create({
        _type: 'serviceDetailed',
        title: service.title,
        tagline: service.tagline,
        description: service.description,
        features: service.features,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
          alt: service.title,
        },
        iconName: service.iconName,
        color: service.color,
        bgColor: service.bgColor,
        subcategories: service.subcategories,
        order: service.order,
        published: true,
      })
      
      console.log(`   ✅ Created: ${result._id}`)
      console.log(`   📋 Features: ${service.features.length}`)
      console.log(`   🔗 Subcategories: ${service.subcategories.length}`)
      successCount++
      
    } catch (error) {
      console.error(`   ❌ Failed to migrate ${service.title}:`, error.message)
      failCount++
    }
  }
  
  console.log(`\n${'='.repeat(60)}`)
  console.log('🎉 Migration Complete!')
  console.log(`${'='.repeat(60)}`)
  console.log(`✅ Successfully migrated: ${successCount} services`)
  console.log(`❌ Failed: ${failCount} services`)
  console.log(`\n💡 Next steps:`)
  console.log(`   1. Check Sanity Studio to verify services`)
  console.log(`   2. Create content service file (lib/services-detailed-content-service.ts)`)
  console.log(`   3. Refactor components to use Sanity data`)
  console.log(`   4. Test thoroughly before removing hardcoded data`)
}

// Run migration
migrateServices().catch(error => {
  console.error('💥 Migration failed:', error)
  process.exit(1)
})
