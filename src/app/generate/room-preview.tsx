import { useQuery } from 'convex/react'

import { Room } from '~/components/room'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

export function RoomPreview({ roomId }: { roomId: Id<'rooms'> }) {
  const roomQuery = useQuery(api.rooms.getRoom, {
    roomId,
  })

  if (!roomQuery) return

  return <Room {...roomQuery} />
}
