import { paginationOptsValidator } from 'convex/server'
import { v } from 'convex/values'
import { internal } from './_generated/api'
import { Id } from './_generated/dataModel'
import { internalMutation, mutation, query } from './_generated/server'

export const getRooms = query({
  args: {
    paginationOpts: paginationOptsValidator,
    query: v.optional(v.string()),
  },
  handler: async ({ db }, { paginationOpts, query }) => {
    if (query && query !== '') {
      return await db
        .query('rooms')
        .withSearchIndex('search_prompt', (q) =>
          q.search('displayPrompt', query),
        )
        .paginate(paginationOpts)
    } else {
      return await db.query('rooms').order('desc').paginate(paginationOpts)
    }
  },
})

export const getRoom = query(
  async ({ db }, { roomId }: { roomId: Id<'rooms'> }) => {
    const room = await db.get(roomId)

    return room
  },
)

export const createRoom = mutation({
  args: {
    room: v.string(),
    theme: v.string(),
    color: v.optional(v.string()),
    prompt: v.optional(v.string()),
  },
  handler: async ({ db, scheduler }, args) => {
    let displayPrompt = `a ${args.theme} ${args.room}${
      args.color ? ` in ${args.color} color` : ''
    }${args.prompt ? `, ${args.prompt}` : ''}`.toLowerCase()

    const room = await db.insert('rooms', { ...args, displayPrompt })

    await scheduler.runAfter(0, internal.generate.generate, {
      roomId: room,
      prompt: `${
        args.room === 'Programming Room'
          ? `a ${args.theme} programming room, a desk and computer, a bed, ${args.color} color`
          : displayPrompt
      }, 4k, unreal engine`,
    })

    return room
  },
})

export const updateRoomResult = internalMutation({
  args: {
    roomId: v.id('rooms'),
    image: v.string(),
  },
  handler: async ({ db }, { roomId, image }) => {
    const room = await db.patch(roomId, {
      image,
    })

    return room
  },
})
