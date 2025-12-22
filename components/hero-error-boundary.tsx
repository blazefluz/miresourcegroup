'use client'

import { Component, ReactNode } from 'react'
import { HeroError } from './hero-error'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class HeroErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Hero component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <HeroError 
          error={this.state.error} 
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      )
    }

    return this.props.children
  }
}