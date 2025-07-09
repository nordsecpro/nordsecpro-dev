import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'NordSecPro - Cybersecurity Excellence',
  description: 'Your trusted partner in cybersecurity excellence. From startup security to SOC 2 compliance.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}