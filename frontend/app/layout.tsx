import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cypentra.com'), // ← set your prod URL
  title: {
    default: 'Cypentra',
    template: '%s | Cypentra',
  },
  description: 'Cypentra',
  applicationName: 'Cypentra',
  generator: 'Next.js',

  // Next will use /app/icon.png automatically.
  // We also declare extra icons so crawlers can find them.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },           // ICO fallback
      { url: '/icon.png', type: 'image/png' },         // served from /app/icon.png
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/site.webmanifest',

  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  //   { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  // ],

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  openGraph: {
    type: 'website',
    url: 'https://www.cypentra.com',
    title: 'Cypentra',
    description: 'Cypentra',
    siteName: 'Cypentra',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Cypentra' },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Cypentra',
    description: 'Cypentra',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: 'https://www.cypentra.com/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
