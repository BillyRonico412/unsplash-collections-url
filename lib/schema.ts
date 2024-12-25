import { z } from "zod"

export const formSchema = z.object({
	collectionUrl: z.string().url(),
})

export const filterSchema = z.object({
	orientation: z.enum(["any", "landscape", "portrait", "squarish"]),
})

export const dataSchema = z.object({
	id: z.string(),
	urls: z.object({
		small: z.string(),
		regular: z.string(),
		full: z.string(),
	}),
	width: z.number(),
	height: z.number(),
})
