'use client'

import { usePaginatedQuery } from 'convex/react'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Room } from '~/components/room'
import { Input } from '~/components/ui/input'
import { Skeleton } from '~/components/ui/skeleton'
import { api } from '../../../convex/_generated/api'
import { Doc } from '../../../convex/_generated/dataModel'

export default function Explore({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const router = useRouter()

  const roomsQuery = usePaginatedQuery(
    api.rooms.getRooms,
    {},
    { initialNumItems: 9 },
  )
  const [filteredRooms, setFilteredRooms] = useState<
    Doc<'rooms'>[] | undefined
  >(undefined)
  const [searchQuery, setSearchQuery] = useState(searchParams.query ?? '')

  const filterData = useMemo(
    () =>
      debounce((query) => {
        console.log('debounce', query)
        setFilteredRooms(
          roomsQuery.results?.filter((item) =>
            item.displayPrompt.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      }, 1000),
    [roomsQuery.results],
  )

  useEffect(() => {
    if (searchQuery) {
      router.push(`?query=${searchQuery}`)
    } else {
      router.push('/explore')
    }
  }, [searchQuery, router])

  useEffect(() => {
    if (searchParams.query) {
      filterData(searchParams.query ?? '')
    } else {
      setFilteredRooms(roomsQuery.results)
    }
  }, [roomsQuery.results])

  return (
    <section className="relative">
      <div className="container py-10 text-center">
        <div className="mx-auto mb-12 max-w-xl">
          <Input
            className="h-auto px-6 py-4 text-lg"
            placeholder="Search prompt..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              filterData(e.target.value)
            }}
          />
        </div>

        {filteredRooms ? (
          <InfiniteScroll
            className="grid w-[-webkit-fill-available] gap-6 md:grid-cols-2 lg:grid-cols-3"
            dataLength={roomsQuery.results.length}
            next={() => roomsQuery.loadMore(9)}
            hasMore={roomsQuery.status === 'CanLoadMore'}
            loader={<Skeleton className="aspect-square w-full rounded-xl" />}
          >
            {filteredRooms
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
