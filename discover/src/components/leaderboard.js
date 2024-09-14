'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Avatar } from '@readyplayerme/visage'

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

const Leaderboard = () => {
	const [avatars, setAvatars] = useState([])
	const [fantokens, setFantokens] = useState([])
	const [topAvatars, setTopAvatars] = useState([])

	const fetchData = async () => {
		try {
			const avatarsResponse = await fetch(`${baseUri}/avatars/all`)
			const fantokensResponse = await fetch(`${baseUri}/fantoken/all`)
			const avatarsData = await avatarsResponse.json()
			const fantokensData = await fantokensResponse.json()

			setAvatars(avatarsData)
			setFantokens(fantokensData)

			const avatarTokenCount = avatarsData.reduce((count, avatar) => {
				count[avatar.phygital_id] = fantokensData.filter(
					(token) => token.phygital_id === avatar.phygital_id
				).length
				return count
			}, {})

			const topAvatarsData = Object.entries(avatarTokenCount)
				.sort(([, countA], [, countB]) => countB - countA)
				.slice(0, 3)
				.map(([phygitalId, count]) => {
					const avatar = avatarsData.find((a) => a.phygital_id === phygitalId)
					return { ...avatar, count }
				})

			setTopAvatars(topAvatarsData)

			console.log(topAvatarsData)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	
	return (
		<div className='p-4 sm:p-6 lg:p-10'>
			<div className='font-bold text-3xl sm:text-4xl lg:text-6xl'>
				Avatar Leaderboard
			</div>
			<div className='flex flex-col sm:flex-row justify-between text-lg sm:text-xl lg:text-2xl mt-4 px-4 sm:px-4'>
				<div className='mt-4'>
					This Week&apos;s Top Performing AI-Powered Brand Ambassadors
				</div>
				<Link
					href='https://webxr.myriadflow.com'
					target='_blank'
					rel='noopener noreferrer'
					className='border'
					style={{
						background: 'transparent',
						border: '6px solid transparent',
						borderRadius: '8px',
						backgroundImage: `
							linear-gradient(white, white),
							linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
						`,
						backgroundOrigin: 'border-box',
						backgroundClip: 'content-box, border-box',
						WebkitBackgroundClip: 'content-box, border-box', // For Safari
						display: 'block',
						width: '180px',
						height: '50px',
						textAlign: 'center',
					}}
				>
					<div style={{ marginTop: '4px' }}>View All</div>
				</Link>
			</div>

			<div className='flex flex-col lg:flex-row justify-center items-center mt-10'>
				{topAvatars.length >= 3 && (
					<>
						<div className='flex flex-col items-center mx-4 my-6'>
							<Avatar
								modelSrc={topAvatars[1].url}
								cameraInitialDistance={4.5}
							/>
							<div className='relative mt-4'>
								<img
									src='./silver.png'
									className='w-2/3 mx-auto'
								/>
								<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold'>
									SILVER
								</div>
							</div>
							<div className='text-lg mt-2'>
								No. tokens: {topAvatars[1].count}
							</div>
							<button className='mt-4 px-4 py-2 text-xl border border-black rounded-lg cursor-pointer'>
								<Link href={`/https://webxr-polygon.vercel.app/${topAvatars[1].phygital_id}`}>
									WEBXR
								</Link>
							</button>
						</div>

						<div className='flex flex-col items-center mx-4 my-6'>
							<Avatar
								modelSrc={topAvatars[0].url}
								cameraInitialDistance={4.5}
							/>
							<div className='relative mt-4'>
								<img
									src='./gold.png'
									className='w-2/3 mx-auto'
								/>
								<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold'>
									GOLD
								</div>
							</div>
							<div className='text-lg mt-2'>
								No. tokens: {topAvatars[0].count}
							</div>
							<button className='mt-4 px-4 py-2 text-xl border border-black rounded-lg cursor-pointer'>
								<Link href={`/https://webxr-polygon.vercel.app/${topAvatars[0].phygital_id}`}>
									WEBXR
								</Link>
							</button>
						</div>

						<div className='flex flex-col items-center mx-4 my-6'>
							<Avatar
								modelSrc={topAvatars[2].url}
								cameraInitialDistance={4.5}
							/>
							<img
								src='./bronze.png'
								className='w-2/3 mx-auto'
							/>
							<div className='text-lg mt-2'>
								No. tokens: {topAvatars[2].count}
							</div>
							<button className='mt-4 px-4 py-2 text-xl border border-black rounded-lg cursor-pointer'>
								<Link href={`/https://webxr-polygon.vercel.app/${topAvatars[2].phygital_id}`}>
									WEBXR
								</Link>
							</button>
						</div>
					</>
				)}
			</div>

			<div className='relative mt-16'>
				<img
					src='./trophy1.png'
					alt='Left'
					className='absolute top-0 left-4 lg:left-10 transform -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32'
				/>
				<img
					src='./trophy2.png'
					alt='Right'
					className='absolute top-0 right-4 lg:right-10 transform -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32'
				/>
				<div className='text-center text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 py-4'>
					Rewarding Creators, Owners and Supporters.
				</div>
			</div>
		</div>
	)
}

export default Leaderboard
