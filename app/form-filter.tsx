import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { filterSchema } from "@/lib/schema"
import { dataFilteredAtom, filterDataAtom } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtomValue, useSetAtom } from "jotai"
import {
	CheckCheck,
	RectangleHorizontal,
	RectangleVertical,
	Square,
	SwatchBook,
} from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

export const FormFilter = () => {
	const dataFiltered = useAtomValue(dataFilteredAtom)
	const setFilterData = useSetAtom(filterDataAtom)

	const form = useForm<z.infer<typeof filterSchema>>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			orientation: "any",
		},
	})

	useEffect(() => {
		form.watch((values) => {
			if (!values.orientation) {
				return
			}
			setFilterData({
				orientation: values.orientation,
			})
		})
	}, [form.watch, setFilterData])

	return (
		<div className="space-y-2">
			<Form {...form}>
				<form className="flex items-center gap-x-4">
					<FormField
						control={form.control}
						name="orientation"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="flex items-center gap-x-2">
									<SwatchBook size={16} />
									Orientation
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(
												filterSchema.shape.orientation.parse(value),
											)
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="any">
												<div className="flex items-center gap-x-2">
													<CheckCheck size={16} />
													Any
												</div>
											</SelectItem>
											<SelectItem value="landscape">
												<div className="flex items-center gap-x-2">
													<RectangleHorizontal size={16} />
													Landscape
												</div>
											</SelectItem>
											<SelectItem value="portrait">
												<div className="flex items-center gap-x-2">
													<RectangleVertical size={16} />
													Portrait
												</div>
											</SelectItem>
											<SelectItem value="squarish">
												<div className="flex items-center gap-x-2">
													<Square size={16} />
													Squarish
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription className="text-base">
									Filter images by orientation and size (
									{dataFiltered ? dataFiltered.length : 0} images filtered )
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}
