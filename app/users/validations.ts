import { email, password } from 'app/auth/validations'
import { z } from 'zod'

export const bioMaxLength = 240
export const tshirtSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const

export const User = z.object({
	name: z.string(),
	slug: z.string(),
	email: z.string(),
	password: password.or(z.string().max(0)),
	role: z.string(),
	species: z.string().nullable(),
	speciesIcon: z.string().nullable(),
	telegram: z.string().optional().nullable(),
	firstname: z.string().optional().nullable(),
	lastname: z.string().optional().nullable(),
	isPublic: z.boolean(),
	isSubscribedOfficial: z.boolean(),
	isSubscribedPublic: z.boolean(),
	website: z.string().optional().nullable(),
	bio: z.string().max(bioMaxLength).optional().nullable(),
	birthday: z.date(),
	clubEntryDate: z.date().optional().nullable(),
	clubFunction: z.string().optional().nullable(),
	clubMembershipType: z.string().optional().nullable(),
	clubMemberId: z.number().optional().nullable(),
	country: z.string().optional().nullable(),
	street: z.string().optional().nullable(),
	zip: z.string().optional().nullable(),
	city: z.string().optional().nullable(),
	tshirtSize: z.enum(tshirtSizes).optional().nullable(),
})

export const UpdateUser = z.object({
	id: z.number(),
	name: z.string(),
	password: password.nullable(),
	birthday: z.date(),
	email,
	species: z.string().nullable(),
	speciesIcon: z.string().nullable(),
	telegram: z.string().max(128).nullable(),
	firstname: z.string().max(128).nullable(),
	lastname: z.string().max(128).nullable(),
	isPublic: z.boolean(),
	isSubscribedOfficial: z.boolean(),
	isSubscribedPublic: z.boolean(),
	website: z.string().nullable(),
	bio: z.string().max(bioMaxLength).nullable(),
	country: z.string().nullable(),
	street: z.string().nullable(),
	zip: z.string().nullable(),
	city: z.string().nullable(),
	tshirtSize: z.enum(tshirtSizes).optional().nullable(),
})
