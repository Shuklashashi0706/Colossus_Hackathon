'use client'
import { useEffect } from 'react'
import { Navbar } from '@/components'
import {
	AvatarCreator,
	BodyType,
	Language,
} from '@readyplayerme/react-avatar-creator'
import { useRouter } from 'next/navigation'

const config = {
	clearCache: true,
	bodyType: 'fullbody' as BodyType,
	quickStart: false,
	language: 'en' as Language,
}

const style = {
	width: '100%',
	height: '80vh',
	border: 'none',
	marginBlock: 'auto',
}

const SUBDOMAIN = 'https://phygitals.readyplayer.me/'

export default function CreateAvatar() {
	const router = useRouter()

	const handleOnAvatarExported = (event: any) => {
		console.log("EXporting avatar");
		
		console.log(`Avatar URL is: ${event.data.url}`)
		console.log(event.data)

		localStorage.setItem('avatar', JSON.stringify(event.data))
		if (event.data.url) {
			setTimeout(() => {
				router.push('/create-webxr-experience')
			}, 500)
		}
	}

	return (
		<>
			<Navbar />
			<main>
				<AvatarCreator
					subdomain='SUBDOMAIN'
					config={config}
					style={style}
					onAvatarExported={handleOnAvatarExported}
				/>
			</main>
		</>
	)
}
