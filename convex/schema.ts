import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  rooms: defineTable({
    room: v.string(),
    theme: v.string(),
    color: v.optional(v.string()),
    prompt: v.optional(v.string()),
    displayPrompt: v.string(),
    image: v.optional(v.string()),
  }),
})
