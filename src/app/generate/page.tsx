'use client'

import { useQuery } from 'convex/react'

import { GeneratePanel } from '~/components/generate-panel'
import { Room } from '~/components/room'
import { Skeleton } from '~/components/ui/skeleton'
import { api } from '../../../convex/_generated/api'

export default function Generate() {
  const roomsQuery = useQuery(api.rooms.getRooms)

  return (
    <div className="container py-8">
      <div className="flex w-full flex-1 flex-col justify-center gap-8 sm:flex-row">
        <div className="flex w-full flex-col gap-3 sm:w-[440px]">
          <GeneratePanel />
        </div>
        <div className="grid w-[-webkit-fill-available] gap-8 lg:grid-cols-2">
          {roomsQuery ? (
            roomsQuery?.map((item) => (
              <div className="mx-auto w-full max-w-xl" key={item._id}>
                <Room {...item} />
              </div>
            ))
          ) : (
            <div className="mx-auto w-full max-w-xl">
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Skeleton className="aspect-square w-full rounded-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
