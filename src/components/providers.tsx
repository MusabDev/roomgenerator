'use client'

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ThemeProvider } from 'next-themes'
import * as React from 'react'

import { env } from '~/env'

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </ConvexProvider>
  )
}
