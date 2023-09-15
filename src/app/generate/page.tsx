'use client'

import { useState } from 'react'

import { GeneratePanel } from '~/components/generate-panel'
import { RoomPreview } from '~/components/room-preview'
import { Id } from '../../../convex/_generated/dataModel'

export default function Generate() {
  const [roomIds, setRoomIds] = useState<Id<'rooms'>[]>([])

  return (
    <div className="container py-8">
      <div className="flex w-full flex-1 flex-col justify-center gap-8 sm:flex-row">
        <div className="flex w-full flex-col gap-3 sm:w-[440px]">
          <GeneratePanel setRoomIds={setRoomIds} />
        </div>
        <div className="grid w-[-webkit-fill-available] gap-8 lg:grid-cols-2">
          {roomIds &&
            roomIds.map((roomId) => (
              <RoomPreview key={roomId} roomId={roomId} />
            ))}
        </div>
      </div>
    </div>
  )
}
