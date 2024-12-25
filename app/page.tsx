import { FetchData } from "@/app/fetch-data"
import FormFields from "@/app/form-fields"

export default function Home() {
	return (
		<div className="container mx-auto max-w-screen-lg space-y-4 p-4">
			<h1 className="text-center font-bold text-2xl">
				Unsplash collection downloader
			</h1>
			<p className="text-center leading-6">
				Download all images from an Unsplash collection by providing the url of
				the collection.
			</p>
			<FormFields />
			<FetchData />
		</div>
	)
}
