import Image from 'next/image'
import Link from 'next/link'

import { cn } from '~/lib/utils'
import { Doc } from '../../convex/_generated/dataModel'
import { buttonVariants } from './ui/button'
import { Skeleton } from './ui/skeleton'

export function Room({ image, displayPrompt, room }: Doc<'rooms'>) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl">
      <Skeleton className="aspect-square w-full rounded-lg" />
      {image ? (
        <>
          <Image src={image} alt="Living room" fill={true} />

          <div className="invisible absolute bottom-0 left-0 w-full scale-95 p-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
            <div className="mt-2 flex w-full flex-wrap items-center gap-2 rounded-md bg-background/80 px-4 py-2 text-left text-sm font-medium backdrop-blur-md">
              Prompt: {displayPrompt}
              <Link
                href={image}
                className={cn(
                  buttonVariants({
                    size: 'sm',
                  }),
                  'h-auto px-2 py-1',
                )}
                download={room}
              >
                Download
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute bottom-0 left-0 w-full p-2">
          <div className="mt-2 flex w-full flex-wrap items-center gap-2 rounded-md bg-background/80 px-4 py-2 text-left text-sm font-medium backdrop-blur-md">
            Prompt: {displayPrompt}
          </div>
        </div>
      )}
    </div>
  )
}
