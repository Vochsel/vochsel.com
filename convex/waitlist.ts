import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'

export const join = mutation({
  args: {
    email: v.string(),
    country: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase()
    const country = args.country.trim().toUpperCase()

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ConvexError('Please enter a valid email address.')
    }

    if (!/^[A-Z]{2}$/.test(country)) {
      throw new ConvexError('Please choose a country.')
    }

    const existingSignup = await ctx.db
      .query('artWaitlist')
      .withIndex('by_email', query => query.eq('email', email))
      .unique()

    if (existingSignup) {
      await ctx.db.patch(existingSignup._id, { country })
      return { status: 'already_joined' as const }
    }

    await ctx.db.insert('artWaitlist', {
      email,
      country,
      source: args.source,
      createdAt: Date.now(),
    })

    return { status: 'joined' as const }
  },
})
