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
  {
    href: '/explore',
    label: 'Explore',
  },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b">
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
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
                  'font-medium text-foreground/70 transition-colors hover:text-foreground',
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
