import type { Metadata } from 'next'
import { Bai_Jamjuree as FontSans } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { cn } from '@/lib/utils'

import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'
import Providers from '@/lib/providers'
import { config } from '@/lib/wagmi'
import AppKitProvider from '@/lib/providers'


const fontSans = FontSans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-sans',
})
export const metadata: Metadata = {
	title: 'Studio | MetaEngage',
	description: 'Bring your brand to the future! MetaEngage Studio empowers you to launch and manage brands, collections, and phygital NFTs with WebXR experiences – all without coding.',
	// openGraph: {
	// 	type: 'website',
	// 	url: 'https://studio.myriadflow.com',
	// 	title: 'Studio | MyriadFlow',
	// 	description: 'Bring your brand to the future! MyriadFlow Studio empowers you to launch and manage brands, collections, and phygital NFTs with WebXR experiences – all without coding.',
	// 	images: [
	// 		{
	// 			url: '/metaimg.png',
	// 			width: 1200,
	// 			height: 630,
	// 			alt: 'MyriadFlow Studio',
	// 		},
	// 	],
	// },
	// twitter: {
	// 	card: 'summary_large_image',
	// 	site: '@MyriadFlow',
	// 	title: 'Studio | MyriadFlow',
	// 	description: 'Bring your brand to the future! MyriadFlow Studio empowers you to launch and manage brands, collections, and phygital NFTs with WebXR experiences – all without coding.',
	// 	images: [
	// 		{
	// 			url: '/metaimg.png',
	// 			width: 1200,
	// 			height: 630,
	// 			alt: 'MyriadFlow Studio',
	// 		},
	// 	],
	// },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const initialState = cookieToInitialState(config, headers().get('cookie'))
	return (
		<html lang='en' suppressHydrationWarning>
			<Providers>
				<body
					className={cn(
						'min-h-screen bg-[#FAF9F6] font-sans antialiased',
						fontSans.variable
					)}
				>
				<AppKitProvider  initialState={initialState}>{children}</AppKitProvider >
				</body>
			</Providers>
		</html>
	)
}
