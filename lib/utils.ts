import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { atom } from "jotai"
import type { z } from "zod"
import type { filterSchema, formSchema, dataSchema } from "@/lib/schema"

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export interface FetchDataInterface {
	request: z.infer<typeof formSchema> & { page: number }
	result: {
		title: string
		total_photos: number
		data: z.infer<typeof dataSchema>[]
	}
}

export const fetchDataAtom = atom<FetchDataInterface | null>(null)

export const filterDataAtom = atom<z.infer<typeof filterSchema>>({
	orientation: "any",
})

export const dataFilteredAtom = atom((get) => {
	const data = get(fetchDataAtom)
	const filter = get(filterDataAtom)
	if (!data) {
		return null
	}
	return data.result.data.filter((item) => {
		if (filter.orientation === "any") {
			return true
		}
		if (filter.orientation === "landscape") {
			return item.width > item.height
		}
		if (filter.orientation === "portrait") {
			return item.width < item.height
		}
		if (filter.orientation === "squarish") {
			return item.width === item.height
		}
		return false
	})
})
