import type { Metadata } from "next"
import { Petrona } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
	title: "Unsplash collection downloader",
	description:
		"Download all images from an Unsplash collection by providing the url of the collection.",
}

interface RootLayoutProps {
	children: React.ReactNode
}

const font = Petrona({
	subsets: ["latin"],
})

export default function RootLayout(props: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={`${font.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system">
					{props.children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
