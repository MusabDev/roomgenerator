'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '~/config/site'
import { cn } from '~/lib/utils'
import { ModeToggle } from './mode-toggle'

const nav = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/generate',
    label: 'Generate',
  },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-8 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold"
          >
            <Image src="/icon.png" alt="Logo" width={32} height={32} />
            {siteConfig.name}
          </Link>

          <nav className="flex items-center gap-6">
            {nav.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  'font-medium text-foreground/70 hover:text-foreground transition-colors',
                  pathname === item.href && 'text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
