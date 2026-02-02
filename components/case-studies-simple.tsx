"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const CaseStudiesClient = dynamic(() => import("./case-studies-client").then(mod => ({ default: mod.CaseStudiesClient })), {
  ssr: false,
})

export default function CaseStudies() {
  return (
    <Suspense fallback={<div className="py-24" />}>
      <CaseStudiesClient />
    </Suspense>
  )
}
