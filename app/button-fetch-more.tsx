"use client"

import { getFetchData } from "@/app/action"
import { Button } from "@/components/ui/button"
import { fetchDataAtom } from "@/lib/utils"
import { produce } from "immer"
import { useAtom } from "jotai"
import { StepForward } from "lucide-react"
import { toast } from "sonner"

export const ButtonFetchMore = () => {
	const [fetchData, setFetchData] = useAtom(fetchDataAtom)
	if (
		!fetchData ||
		fetchData.request.page * 25 >= fetchData.result.total_photos
	) {
		return <></>
	}
	return (
		<Button
			className="uppercase"
			onClick={async () => {
				const fetchDataRes = await getFetchData({
					collectionUrl: fetchData.request.collectionUrl,
					page: fetchData.request.page + 1,
					info: {
						title: fetchData.result.title,
						total_photos: fetchData.result.total_photos,
					},
				})
				if (!fetchDataRes) {
					return toast.error("Failed to fetch more images")
				}
				setFetchData((prev) =>
					produce(prev, (draft) => {
						if (!draft) {
							return
						}
						draft.request = fetchDataRes.request
						draft.result.data.push(...fetchDataRes.result.data)
					}),
				)
				toast.success("More images fetched successfully")
			}}
		>
			<StepForward size={24} />
			Fetch more
		</Button>
	)
}
