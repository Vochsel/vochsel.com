import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const list = query({
  args: {
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword || args.password !== adminPassword) {
      throw new ConvexError('Unauthorized')
    }

    const signups = await ctx.db.query('artWaitlist').order('desc').collect()
    return signups.map(signup => ({
      id: signup._id,
      email: signup.email,
      country: signup.country,
      variant: signup.variant,
      source: signup.source,
      createdAt: signup.createdAt,
    }))
  },
})

export const join = mutation({
  args: {
    email: v.string(),
    country: v.string(),
    variant: v.union(
      v.literal('art'),
      v.literal('object'),
      v.literal('music'),
    ),
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
      .withIndex('by_email_and_variant', query =>
        query.eq('email', email).eq('variant', args.variant),
      )
      .unique()

    if (existingSignup) {
      await ctx.db.patch(existingSignup._id, { country })
      return { status: 'already_joined' as const }
    }

    const legacySignup = await ctx.db
      .query('artWaitlist')
      .withIndex('by_email', query => query.eq('email', email))
      .filter(query => query.eq(query.field('variant'), undefined))
      .first()

    if (legacySignup) {
      await ctx.db.patch(legacySignup._id, { country, variant: args.variant })
      return { status: 'already_joined' as const }
    }

    await ctx.db.insert('artWaitlist', {
      email,
      country,
      variant: args.variant,
      source: args.source,
      createdAt: Date.now(),
    })

    return { status: 'joined' as const }
  },
})
