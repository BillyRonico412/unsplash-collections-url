"use client"

import { ButtonDownload } from "@/app/button-download"
import { ButtonFetchMore } from "@/app/button-fetch-more"
import { ButtonView } from "@/app/button-view"
import { FormFilter } from "@/app/form-filter"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { fetchDataAtom } from "@/lib/utils"
import { useAtomValue } from "jotai"
import { Image } from "lucide-react"

export const FetchData = () => {
	const fetchData = useAtomValue(fetchDataAtom)
	if (!fetchData) {
		return <></>
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-x-2 font-semibold text-lg">
					<Image size={24} />
					{fetchData.result.title} - {fetchData.result.data.length} images
				</CardTitle>
			</CardHeader>
			<CardContent>
				<FormFilter />
			</CardContent>
			<CardFooter className="space-x-4">
				<ButtonDownload />
				<ButtonFetchMore />
				<ButtonView />
			</CardFooter>
		</Card>
	)
}
