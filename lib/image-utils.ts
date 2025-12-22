import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from './sanity'
import { SanityImageAsset } from '@/types/sanity'

// Create image URL builder
const builder = createImageUrlBuilder(sanityClient)

export interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpg' | 'png' | 'auto'
  fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'clip' | 'min'
}

/**
 * Generate optimized image URL from Sanity image asset
 */
export function getOptimizedImageUrl(
  image: SanityImageAsset,
  options: ImageOptions = {}
): string {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options

  let imageBuilder = builder.image(image)
    .quality(quality)
    .fit(fit)

  if (format !== 'auto') {
    imageBuilder = imageBuilder.format(format)
  }

  if (width) {
    imageBuilder = imageBuilder.width(width)
  }

  if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder.url()
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(
  image: SanityImageAsset,
  options: ImageOptions = {}
): {
  mobile: string
  tablet: string
  desktop: string
  original: string
} {
  const baseOptions = { ...options, format: 'webp' as const }

  return {
    mobile: getOptimizedImageUrl(image, { ...baseOptions, width: 768 }),
    tablet: getOptimizedImageUrl(image, { ...baseOptions, width: 1024 }),
    desktop: getOptimizedImageUrl(image, { ...baseOptions, width: 1920 }),
    original: getOptimizedImageUrl(image, baseOptions),
  }
}

/**
 * Generate image srcSet for responsive images
 */
export function generateSrcSet(
  image: SanityImageAsset,
  options: ImageOptions = {}
): string {
  const urls = getResponsiveImageUrls(image, options)
  
  return [
    `${urls.mobile} 768w`,
    `${urls.tablet} 1024w`,
    `${urls.desktop} 1920w`,
  ].join(', ')
}

/**
 * Get image dimensions and metadata
 */
export function getImageMetadata(image: SanityImageAsset) {
  return {
    alt: image.alt || '',
    hasHotspot: !!image.hotspot,
    hasCrop: !!image.crop,
  }
}