import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { Providers } from '~/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Room Generator',
  description: 'Instant room creation powered by AI',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: ['https://roomgenerator.vercel.app/og.png'],
    title: 'Room Generator',
    description: 'Instant room creation powered by AI',
    url: 'https://roomgenerator.vercel.app',
    siteName: 'Room Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://roomgenerator.vercel.app/og.png'],
    title: 'Room Generator',
    description: 'Instant room creation powered by AI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
