import { ReactNode } from "react"

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  )
}
