"use server"

import { dataSchema } from "@/lib/schema"
import type { FetchDataInterface } from "@/lib/utils"
import parseUrl from "parse-url"
import { z } from "zod"

const NB_BY_PAGE = 25

export const getFetchData = async (
	params: FetchDataInterface["request"] & {
		info?: {
			title: string
			total_photos: number
		}
	},
): Promise<FetchDataInterface | null> => {
	const { parse_failed, pathname } = parseUrl(params.collectionUrl)
	if (parse_failed) {
		return null
	}
	const pathnameSplitted = pathname.split("/")
	const collectionIndex = pathnameSplitted.indexOf("collections")
	if (collectionIndex === -1) {
		return null
	}
	const collectionId = pathnameSplitted[collectionIndex + 1]

	let title: string | undefined
	let total_photos: number | undefined

	if (params.info) {
		title = params.info.title
		total_photos = params.info.total_photos
	} else {
		const fetchInfoUrl = `https://api.unsplash.com/collections/${collectionId}?client_id=${process.env.UNSPLASH_CLIENT_ID}`
		const infoRes = await fetch(fetchInfoUrl)
		if (!infoRes.ok) {
			return null
		}
		const infoData = await infoRes.json()
		const infoDataSafeParsed = z
			.object({
				title: z.string(),
				total_photos: z.number(),
			})
			.safeParse(infoData)
		if (!infoDataSafeParsed.success) {
			return null
		}
		title = infoDataSafeParsed.data.title
		total_photos = infoDataSafeParsed.data.total_photos
	}

	if (!title || !total_photos) {
		return null
	}

	const fetchDataUrl = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${process.env.UNSPLASH_CLIENT_ID}&per_page=${NB_BY_PAGE}&page=${params.page}`
	const res = await fetch(fetchDataUrl)
	if (!res.ok) {
		return null
	}
	const data = await res.json()
	const dataSafeParsed = dataSchema.array().safeParse(data)
	if (!dataSafeParsed.success) {
		return null
	}
	return {
		request: {
			...params,
		},
		result: {
			title,
			total_photos,
			data: dataSafeParsed.data,
		},
	}
}
