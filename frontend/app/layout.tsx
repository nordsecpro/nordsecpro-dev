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
  description: 'Cypentra provides cutting-edge digital commerce solutions to help your business thrive online. Discover our comprehensive platform for modern e-commerce.',
  applicationName: 'Cypentra',
  generator: 'Next.js',
  keywords: ['cypentra', 'e-commerce', 'digital commerce', 'online store', 'business solutions'],
  authors: [{ name: 'Cypentra Team' }],
  creator: 'Cypentra',
  publisher: 'Cypentra',

  // Icons configuration
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/site.webmanifest',

  // Viewport configuration
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  openGraph: {
    title: "Cypentra – Straightforward Cybersecurity",
    description: "Secure the center. Your SOC 2, vCISO & Cloud Security Partner. Secure. Comply. Grow.",
    images: ["/og.png"],
    url: "https://cypentra.com",
    siteName: "Cypentra",
  },

  twitter: {
    card: 'summary_large_image',
    site: '@cypentra',
    creator: '@cypentra',
    title: "Cypentra – Straightforward Cybersecurity",
    description: "Secure the center. Your SOC 2, vCISO & Cloud Security Partner. Secure. Comply. Grow.",
    images: ["/og.png"],
  },


  // Robots configuration
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

  // Canonical URL
  alternates: {
    canonical: 'https://www.cypentra.com',
  },

  // Additional SEO metadata
  category: 'E-commerce',
  classification: 'Business',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JRFT3MY9EF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-1" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-JRFT3MY9EF');
         `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17494469323"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-2" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'AW-17494469323', {
             page_title: document.title,
             page_location: window.location.href,
           });
         `}
        </Script>

        {/* Structured Data for SEO */}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {`
           {
             "@context": "https://schema.org",
             "@type": "Organization",
             "name": "Cypentra",
             "url": "https://www.cypentra.com",
             "logo": "https://www.cypentra.com/icon.png",
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
         `}
        </Script>

        {/* Preconnect to external domains for performance */}
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