'use client'
import React, { useEffect, useState } from 'react'
import Avatars from './avatars'

const Leaderboard = () => {
	const [avatar, setAvatar] = useState([])

	const getBrands = async () => {
		const baseUri ='https://app.myriadflow.com' || process.env.NEXT_PUBLIC_URI
		console.log("Public uri",process.env.NEXT_PUBLIC_URI);
		
		localStorage.setItem(
			'BaseSepoliaChain',
			'554b4903-9a06-4031-98f4-48276c427f78'
		)
		const chaintype = localStorage.getItem('BaseSepoliaChain')

		const avatar = await fetch(
			`${baseUri}/avatars/all/${chaintype}
`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		const avatardata = await avatar.json()
		console.log("avatar",avatardata);
		
		// setAvatar(avatardata);
		setAvatar([...avatardata].reverse())
	}

	useEffect(() => {
		getBrands()
	}, [])

	return (
		<div>
			<div
				style={{
					backgroundColor: 'black',
					position: 'relative',
					marginTop: '0px',
				}}
			>
				<div
					className='text-center font-bold'
					style={{
						background:
							'linear-gradient(to right, #F45EC1 , #F45EC1 , #4EB9F3, #4EB9F3)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundColor: '#00000021',
						paddingTop: '20px',
						paddingBottom: '20px',
						textAlign: 'center',
						fontSize: '30px',
					}}
				>
					More than NFTs.
				</div>
			</div>

			{/* <div style={{ textAlign: 'center', fontSize: '40px', marginTop: '50px' }}>
				WebXR Xperiences live soon!
			</div> */}
			<div className="px-16 pt-20">
				<div className="text-lg font-semibold mt-6 text-[#DF1FDD]">Most Recently Launched</div>
				<div className="text-6xl font-semibold mt-6 text-white">New on WebXR</div>
				<div className="text-xl font-semibold mt-6 text-white">New Frontier: Be Among the First to Discover the Newest Xperiences Making Their Debut!</div>
			</div>

			<div
				className='pt-20 flex'
				style={{ gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}
			>
				{avatar?.slice(0, 12).reverse().map((nft, index) => (
					<Avatars key={index} nft={nft} />
				))}
			</div>
		</div>
	)
}

export default Leaderboard
