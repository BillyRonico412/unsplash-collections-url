"use client"

import { getFetchData } from "@/app/action"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/schema"
import { fetchDataAtom } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSetAtom } from "jotai"
import { CloudDownload, LinkIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

export default function FormFields() {
	const setFetchData = useSetAtom(fetchDataAtom)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			collectionUrl: "",
		},
	})
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const fetchDataRes = await getFetchData({
			collectionUrl: values.collectionUrl,
			page: 1,
		})
		if (!fetchDataRes) {
			return toast.error("Failed to fetch images")
		}
		setFetchData(fetchDataRes)
		toast.success("Images fetched successfully")
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="collectionUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center gap-x-2 text-base">
								<LinkIcon size={16} />
								Collection url
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Type the url of the collection"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Example:
								"https://unsplash.com/fr/collections/2048188/accommodation"
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="uppercase"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					<CloudDownload size={16} />
					Fetch images
				</Button>
			</form>
		</Form>
	)
}
