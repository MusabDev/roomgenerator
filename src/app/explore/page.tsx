'use client'

import { usePaginatedQuery } from 'convex/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useState } from 'react'
import { Room } from '~/components/room'
import { Input } from '~/components/ui/input'
import { Skeleton } from '~/components/ui/skeleton'
import { api } from '../../../convex/_generated/api'

export default function Explore() {
  const [searchText, setSearchText] = useState('')
  const roomsQuery =
    usePaginatedQuery(
      api.rooms.getRooms,
      { query: searchText },
      { initialNumItems: 18 },
    ) || []

  return (
    <section className="relative">
      <div className="container py-10 text-center">
        <div className="mx-auto mb-12 max-w-xl">
          <Input
            className="h-auto px-6 py-4 text-lg"
            placeholder="Search prompt..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {roomsQuery?.results.length > 0 ? (
          <InfiniteScroll
            className="grid w-[-webkit-fill-available] gap-6 md:grid-cols-2 lg:grid-cols-3"
            dataLength={roomsQuery.results.length}
            next={() => roomsQuery.loadMore(9)}
            hasMore={roomsQuery.status === 'CanLoadMore'}
            loader={<Skeleton className="aspect-square w-full rounded-xl" />}
          >
            {roomsQuery.results
              ?.filter((item) => item.image)
              .map((item) => <Room {...item} key={item._id} />)}
          </InfiniteScroll>
        ) : (
          <div className="grid w-[-webkit-fill-available] gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="aspect-square w-full rounded-xl" />
          </div>
        )}
      </div>
    </section>
  )
}
