import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  artWaitlist: defineTable({
    email: v.string(),
    country: v.optional(v.string()),
    variant: v.optional(v.union(
      v.literal('art'),
      v.literal('object'),
      v.literal('music'),
    )),
    source: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index('by_email', ['email'])
    .index('by_email_and_variant', ['email', 'variant']),
})
