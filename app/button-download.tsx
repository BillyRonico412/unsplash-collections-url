"use client"

import { Button } from "@/components/ui/button"
import { dataFilteredAtom, fetchDataAtom } from "@/lib/utils"
import { useAtomValue } from "jotai"
import { Download } from "lucide-react"

export const ButtonDownload = () => {
	const fetchData = useAtomValue(fetchDataAtom)
	const dataFiltered = useAtomValue(dataFilteredAtom)
	if (!dataFiltered || !fetchData) {
		return <></>
	}
	return (
		<Button
			className="uppercase"
			onClick={() => {
				const a = document.createElement("a")
				document.body.appendChild(a)
				a.style.display = "none"
				const json = JSON.stringify(dataFiltered, null, 2)
				const blob = new Blob([json], { type: "application/json" })
				const url = window.URL.createObjectURL(blob)
				a.href = url
				const collectionName = fetchData.result.title
				a.download = `${collectionName}.json`
				a.click()
				window.URL.revokeObjectURL(url)
				a.remove()
			}}
		>
			<Download size={24} />
			Download
		</Button>
	)
}
