import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function Home() {
  return (
    <div className="container py-20 text-center">
      <h1 className="max-w-4xl mx-auto text-4xl font-bold tracking-normal sm:text-7xl">
        Instant room creation powered by AI
      </h1>
      <p className="max-w-xl mx-auto mt-6 mb-8 text-lg text-foreground/80">
        Instantly generate your dream room with different themes. Join our
        public beta test and remodel your room today!
      </p>
      <Link
        href="/generate"
        className={cn(buttonVariants(), 'text-base h-auto py-3 px-6')}
      >
        Generate your dream rooms
      </Link>

      <div className="relative w-full max-w-4xl mx-auto mt-12 overflow-hidden aspect-video rounded-3xl">
        <Image
          src="/living-room-image.png"
          alt="Living Room"
          fill={true}
          className="object-cover object-bottom"
        />
      </div>
    </div>
  )
}
