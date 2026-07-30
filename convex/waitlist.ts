import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'

export const join = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase()

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ConvexError('Please enter a valid email address.')
    }

    const existingSignup = await ctx.db
      .query('artWaitlist')
      .withIndex('by_email', query => query.eq('email', email))
      .unique()

    if (existingSignup) {
      return { status: 'already_joined' as const }
    }

    await ctx.db.insert('artWaitlist', {
      email,
      source: args.source,
      createdAt: Date.now(),
    })

    return { status: 'joined' as const }
  },
})
