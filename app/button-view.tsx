import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { dataFilteredAtom, fetchDataAtom } from "@/lib/utils"
import { useAtomValue } from "jotai"
import { Eye } from "lucide-react"
import Image from "next/image"
import Masonry from "react-responsive-masonry"

export const ButtonView = () => {
	const fetchData = useAtomValue(fetchDataAtom)
	const dataFiltered = useAtomValue(dataFilteredAtom)
	if (!fetchData || !dataFiltered) {
		return <></>
	}
	return (
		<Dialog>
			<DialogTrigger asChild={true}>
				<Button
					className="uppercase"
					onClick={() => console.log("Download images")}
				>
					<Eye size={24} />
					View images
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Images from {fetchData.result.title}</DialogTitle>
					<DialogDescription>{dataFiltered.length} images</DialogDescription>
				</DialogHeader>
				<ScrollArea className="max-h-[80dvh]">
					<Masonry columnsCount={2} gutter="0.5rem">
						{dataFiltered.map((it) => (
							<Image
								key={it.urls.regular}
								src={it.urls.regular}
								alt={it.id}
								className="rounded-[--radius] object-cover object-center"
								quality={50}
								width={it.width}
								height={it.height}
							/>
						))}
					</Masonry>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}