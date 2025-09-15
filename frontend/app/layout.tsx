// app/layout.tsx (or app/layout.ts)
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cypentra.com'),
  title: {
    default: 'Cypentra - Your Digital Commerce Solution',
    template: '%s | Cypentra',
  },
  description:
    'Cypentra provides cutting-edge digital commerce solutions to help your business thrive online. Discover our comprehensive platform for modern e-commerce.',
  applicationName: 'Cypentra',
  generator: 'Next.js',
  keywords: ['cypentra', 'e-commerce', 'digital commerce', 'online store', 'business solutions'],
  authors: [{ name: 'Cypentra Team' }],
  creator: 'Cypentra',
  publisher: 'Cypentra',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/site.webmanifest',

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  // IMPORTANT for LinkedIn
  openGraph: {
    type: 'website',
    url: 'https://www.cypentra.com',
    title: 'Cypentra - Your Digital Commerce Solution',
    description:
      'Cypentra provides cutting-edge digital commerce solutions to help your business thrive online.',
    siteName: 'Cypentra',
    locale: 'en_US',
    images: [
      {
        url: '/logo.png',            // lives in /public/logo.png
        width: 1200,
        height: 630,
        alt: 'Cypentra - Digital Commerce Solutions',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@cypentra',
    creator: '@cypentra',
    title: 'Cypentra - Your Digital Commerce Solution',
    description:
      'Cypentra provides cutting-edge digital commerce solutions to help your business thrive online.',
    images: ['/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: { canonical: 'https://www.cypentra.com' },
  category: 'E-commerce',
  classification: 'Business',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GA scripts unchanged */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JRFT3MY9EF" strategy="afterInteractive" />
        <Script id="google-analytics-1" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-JRFT3MY9EF');`}</Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17494469323" strategy="afterInteractive" />
        <Script id="google-analytics-2" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-17494469323',{page_title:document.title,page_location:window.location.href});`}</Script>

        {/* Structured Data */}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cypentra",
            "url": "https://www.cypentra.com",
            "logo": "https://www.cypentra.com/logo.png",
            "description": "Cypentra provides cutting-edge digital commerce solutions to help your business thrive online.",
            "foundingDate": "2024",
            "sameAs": [
              "https://twitter.com/cypentra",
              "https://linkedin.com/company/cypentra"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "url": "https://www.cypentra.com/contact"
            }
          }
        `}</Script>

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
