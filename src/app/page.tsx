import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function Home() {
  return (
    <section className="relative">
      <div className="container py-20 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-normal sm:text-7xl">
          Create your unique rooms using AI
        </h1>
        <p className="mx-auto mb-8 mt-6 max-w-xl text-lg text-foreground/80">
          Creating your own unique rooms is a breeze – all it takes is a handful
          of straightforward steps.
        </p>
        <Link
          href="/generate"
          className={cn(buttonVariants(), 'h-auto px-6 py-3 text-base')}
        >
          Generate your dream rooms
        </Link>

        <div className="relative mx-auto mt-12 aspect-video w-full max-w-4xl overflow-hidden rounded-3xl">
          <Image
            src="/living-room-image.png"
            alt="Living Room"
            fill={true}
            className="object-cover object-bottom"
          />
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="relative left-0 top-0 aspect-square w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-pink-600 opacity-30 sm:left-1/2"></div>
      </div>
    </section>
  )
}
