import { useState, useEffect } from 'react'
import { Avatar } from '@readyplayerme/visage'
import Link from 'next/link'

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

const AvatarLeaderboard = () => {
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
		<div>
			<div className='font-bold text-white text-6xl px-16' style={{marginTop:'80px'}}>
				Avatar Leaderboard
			</div>
			<div
				className='flex justify-between text-2xl px-16'
				style={{ justifyContent: 'space-between' }}
			>
				<div className='mt-4 text-white'>
					This Week&apos;s Top performing AI-Powered Brand Ambassadors
				</div>
			</div>

			<div
				className='flex px-10'
				style={{
					justifyContent: 'center',
					marginTop: '50px',
					paddingTop: '200px',
					paddingBottom: '200px',
					backgroundImage: "url('/leaderboard.png')"
				}}
			>
				{topAvatars.length >= 3 && (
					<>
						<div className='flex flex-col justify-center items-center'>
							{/* <img
								src='./image 7.png'
								style={{
									width: '60%',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							/> */}
							<Avatar
								modelSrc={topAvatars[1].url}
								cameraInitialDistance={4.5}
							/>
							<div style={{ position: 'relative' }}>
								<img
									src='./silver.png'
									style={{
										width: '60%',
										display: 'block',
										marginLeft: 'auto',
										marginRight: 'auto',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: '35%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										textAlign: 'center',
										fontSize: '24px',
										fontWeight: 'bold',
									}}
								>
									SILVER
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginTop: '10px',
									marginBottom: '20px',
									color: 'white'

								}}
							>
								No. tokens: {topAvatars[1].count}
							</div>

							<button
								className='text-2xl text-center'
								style={{
									border: '2px solid black',
									padding: '0.5rem 2.5rem',
									borderRadius: '17px',
									cursor: 'pointer',
									marginLeft: 'auto',
									marginRight: 'auto',
									color: 'black',
									backgroundColor:'white'
								}}
							>
								<Link
									href={`/https://webxr-polygon.vercel.app/${topAvatars[1].phygital_id}`}
								>
									WEBXR
								</Link>
							</button>
						</div>

						<div
							className='flex flex-col justify-center items-center'
							style={{ marginTop: '-200px' }}
						>
							{/* <img
								src='./f41.png'
								style={{
									width: '60%',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							/> */}
							<Avatar
								modelSrc={topAvatars[0].url}
								cameraInitialDistance={4.5}
							/>
							<div style={{ position: 'relative' }}>
								<img
									src='./gold.png'
									style={{
										width: '60%',
										display: 'block',
										marginLeft: 'auto',
										marginRight: 'auto',
									}}
								/>

								<div
									style={{
										position: 'absolute',
										top: '35%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										textAlign: 'center',
										fontSize: '24px',
										fontWeight: 'bold',

									}}
								>
									GOLD
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginTop: '10px',
									marginBottom: '20px',
									color: 'white'

								}}
							>
								No. tokens: {topAvatars[0].count}
							</div>

							<button
								className='text-2xl text-center'
								style={{
									border: '2px solid black',
									padding: '0.5rem 2.5rem',
									borderRadius: '17px',
									cursor: 'pointer',
									marginLeft: 'auto',
									marginRight: 'auto',
									color: 'black',
									backgroundColor:'white'

								}}
							>
								<Link
									href={`/https://webxr-polygon.vercel.app/${topAvatars[0].phygital_id}`}
								>
									WEBXR
								</Link>
							</button>
						</div>

						<div className='flex flex-col justify-center items-center'>
							{/* <img
								src='./f43.png'
								style={{
									width: '60%',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							/> */}
							<Avatar
								modelSrc={topAvatars[2].url}
								cameraInitialDistance={4.5}
							/>
							<img
								src='./bronze.png'
								style={{
									width: '60%',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginTop: '10px',
									marginBottom: '20px',
									color: 'white'

								}}
							>
								No. tokens: {topAvatars[2].count}
							</div>

							<button
								className='text-2xl text-center'
								style={{
									border: '2px solid black',
									padding: '0.5rem 2.5rem',
									borderRadius: '17px',
									cursor: 'pointer',
									marginLeft: 'auto',
									marginRight: 'auto',
									color: 'black',
									backgroundColor:'white'

								}}
							>
								<Link
									href={`/https://webxr-polygon.vercel.app/${topAvatars[2].phygital_id}`}
								>
									WEBXR
								</Link>
							</button>
						</div>
					</>
				)}
			</div>

			<div
				style={{
					backgroundColor: '#00000021',
					position: 'relative',
					// marginTop: '100px',
				}}
			>
				{/* Left Image */}
				<img
					src='./trophy1.png'
					alt='Left'
					style={{
						position: 'absolute',
						top: '0',
						left: '50px',
						transform: 'translateY(-50%)',
						width: '150px', // Adjust as needed
						height: '150px', // Adjust as needed
					}}
				/>

				{/* Right Image */}
				<img
					src='./trophy2.png'
					alt='Right'
					style={{
						position: 'absolute',
						top: '0',
						right: '50px',
						transform: 'translateY(-50%)',
						width: '150px', // Adjust as needed
						height: '150px', // Adjust as needed
					}}
				/>

				<div
					className='text-center text-2xl font-bold'
					style={{
						background:
							'linear-gradient(to right, #F45EC1 , #F45EC1 , #4EB9F3, #4EB9F3)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundColor: '#121212',
						paddingTop: '20px',
						paddingBottom: '20px',
						textAlign: 'center',
					}}
				>
					Rewarding Creators, Owners and Supporters.
				</div>
			</div>

			<div className="flex items-center justify-center min-h-screen">
				<div className="p-1 rounded-lg w-96 h-96 flex items-center justify-center"
				style={{
					background: "transparent",
					border: "8px solid transparent",
					borderRadius: "8px",
					backgroundImage: `
             linear-gradient(to right, #000000, #1a1a1a, #3b0d71),
  linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
`,
					backgroundOrigin: "border-box",
					backgroundClip: "content-box, border-box",
					WebkitBackgroundClip: "content-box, border-box", // For Safari
					color: "black", // Adjust text color to match your design
					cursor: "pointer",
					
				}}>
					<div className="text-center h-80 w-80 flex flex-col items-center justify-center">
						<h1 style={{ fontSize: '2.5rem' }} className="text-white font-bold mb-4">Create Profile</h1>
						<p className="mb-4 text-white">& Earn Rewards</p>
						<button
							className="rounded"
							style={{
								background: "transparent",
								border: "6px solid transparent",
								borderRadius: "8px",
								backgroundImage: `
              linear-gradient(white, white),
              linear-gradient(to bottom, #30D8FF, #EE64ED)
            `,
								backgroundOrigin: "border-box",
								backgroundClip: "content-box, border-box",
								WebkitBackgroundClip: "content-box, border-box", // For Safari
								color: "black", // Adjust text color to match your design
								cursor: "pointer",
								fontSize: "1.1rem",
								width: "150px",
								height: '50px', // Set fixed width for the button
								display: "block",
								margin: "20px auto", // Center the button
							}}
						>
							Get Started
						</button>
					</div>
				</div>
			</div>



		</div>
	)
}

export default AvatarLeaderboard
