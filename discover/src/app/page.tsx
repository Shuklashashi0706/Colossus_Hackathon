'use client'
import Image from 'next/image'
import Link from 'next/link'
import MostLoved from '../components/mostLoved'
import MostRecently from '../components/mostRecently'
import LeaderBoard from '../components/leaderboard'
import HotNFTs from '../components/hotNFTs'
import LatestNFTs from '../components/latestNFTs'
import Brand from '../components/brand'
import CreateBanner from '../components/createbanner'
import Header1 from '../components/header1'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
	const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development'

	const apiUrl = isDevelopment
		? 'http://localhost:3000' // Local development URL
		: 'https://discover.myriadflow.com' // Production URL

	// console.log("api url", apiUrl);

	const [brands, setBrands] = useState([]);
	const [phygitals, setPhygitals] = useState<any>([]);
	const [collections, setCollections] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	const [showForm, setShowForm] = useState(false);
	const account = useAccount()
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [tosChecked, setTosChecked] = useState(false);
	const [newsletterChecked, setNewsletterChecked] = useState(false);

	const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

	useEffect(() => {
		const checkEmailExists = async () => {
			if (account?.address) {
				try {
					const response = await fetch(`${baseUri}/profiles/email/${account.address}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (response.ok) {
						const data = await response.json();
						console.log(data.email);

						// If the email exists, set showForm to false
						if (data.email) {
							setShowForm(false);
						} else {
							setShowForm(true);
						}
					} else {
						// Handle errors or cases where no data is returned
						setShowForm(true);
					}
				} catch (error) {
					console.error('Error fetching profile data:', error);
					setShowForm(true);
				}
			}
		};

		checkEmailExists();
	}, [account.address]);


	const handleSubmit = async () => {
		if (displayName && email && tosChecked) {
			try {
				const profileId = uuidv4();
				const response = await fetch(`${baseUri}/profiles`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: profileId,
						name: displayName,
						email: email,
						wallet_address: account.address,
						chaintype_id: '554b4903-9a06-4031-98f4-48276c427f78'
					}),
				});

				if (response.ok) {
					setShowForm(false);
				} else {
					console.error('Failed to submit profile data');
				}
			} catch (error) {
				console.error('Error submitting profile data:', error);
			}
		}
	};

	const getBrands = async () => {
		try {
			setLoading(true);
			//   const res = await fetch(`${apiUrl}/api/brands`);
			//   const phyres = await fetch(`${apiUrl}/api/phygitals`);
			//   const collres = await fetch(`${apiUrl}/api/collections`);

			const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

			const res = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const collres = await fetch(`${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});



			if (!res.ok || !phyres.ok || !collres.ok) {
				throw new Error('Failed to fetch data');
			}

			const result = await res.json();
			const phyresult = await phyres.json();
			const collresult = await collres.json();

			setBrands(result);
			setPhygitals(phyresult);
			setCollections(collresult);

			setLoading(false);

			console.log("new database output", result, phyresult, collresult);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getBrands()
	}, [])

	const exploreButtonStyle = {
		padding: '10px 40px',
		fontSize: '1rem',
		fontWeight: 'bold',
		color: 'white',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		backgroundImage: 'url("./Rectangle 12.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Add box-shadow for a better visual effect
	}

	return (
		<div className="bg-black">
			<Header1 />
			<div className="flex flex-col mt-20 md:flex-row h-screen bg-white">
				<div className="w-full md:w-1/2 h-full px-8 md:px-16 flex flex-col justify-center">
					<div className="text-4xl md:text-7xl font-bold">Discover</div>
					<div className="text-3xl md:text-6xl font-semibold mt-4 md:mt-6">Phygital Xperience</div>
					<div className="text-3xl md:text-6xl font-semibold mt-2 md:mt-4">with MetaEngage</div>
					<div className="text-lg md:text-2xl mt-6 md:mt-10">
						Explore & launch brands and phygitals with a WebXR experience.
						Create & interact with AI-Powered brand ambassadors.
					</div>
					<div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-10">
						<Link href="#movetotrends" style={exploreButtonStyle}>Explore</Link>
						<Link href="https://studio.myriadflow.com" target="_blank" style={exploreButtonStyle}>Launch</Link>
					</div>
				</div>

				<div
					className="w-full mt-10 md:mt-0 md:w-1/2 h-full "
					style={{
						backgroundImage: 'url("./landing.png")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						position: 'relative',
					}}
				>
					<img
						src='./image 4.png'
						alt='Top Left'
						className="absolute top-24 left-10 w-32 h-32 hidden md:block md:w-64 md:h-64"
					/>
					<img
						src='./image 6.png'
						alt='Top Right'
						className="absolute top-24 right-10 w-32 h-32 hidden md:block md:w-64 md:h-64"
					/>
					<img
						src='./image 8.png'
						alt='Bottom Left'
						className="absolute bottom-10 left-10 w-32 h-32 md:w-64 md:h-64"
					/>
					<img
						src='./image 7.png'
						alt='Overlay'
						className="absolute bottom-10 left-10 w-32 h-32 md:w-64 md:h-72 mb-5"
					/>
					<img
						src='./image 5.png'
						alt='Bottom Right'
						className="absolute bottom-10 right-10 w-32 h-32 md:w-64 md:h-64"
					/>
				</div>
			</div>

			{showForm && (
				<div
					className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center"
					style={{
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						WebkitBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						MozBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
					}}
				>
					<div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
						<h2
							className="text-3xl mb-4"
							style={{
								background: 'linear-gradient(90deg, #30D8FF 0%, #5B0292 100%)',
								backgroundClip: 'text',
								color: 'transparent',
								fontFamily: 'Bai Jamjuree, sans-serif'
							}}
						>
							You&apos;re almost ready!
						</h2>
						<h2
							style={{
								fontFamily: 'Bai Jamjuree, sans-serif',
								fontWeight: 300,
								fontSize: '15px',
								lineHeight: '27.5px',
								textAlign: 'center',
								color: 'black'
							}}
						>
							Choose a public display name and share your email address to sign up with MyriadFlow.
						</h2>

						<input
							type="text"
							placeholder="Display Name"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							className="w-full p-2 mb-2 rounded-lg border border-gray-300 mt-4"
							required
						/>
						<input
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-2 mb-2 rounded-md border border-gray-300"
							required
						/>
						<div className="mb-4 flex items-center mt-4">
							<input
								type="checkbox"
								id="tos"
								checked={tosChecked}
								onChange={(e) => setTosChecked(e.target.checked)}
								className="mr-2 -mt-4"
								required
							/>
							<label htmlFor="tos" className="text-sm">
								I have read and accept the{' '}
								<a href="#" className="text-blue-500">
									Terms of Service
								</a>{' '}
								and confirm that I am at least 18 years old.
							</label>
						</div>
						<div className="mb-6 flex items-center">
							<input
								type="checkbox"
								id="newsletter"
								checked={newsletterChecked}
								onChange={(e) => setNewsletterChecked(e.target.checked)}
								className="mr-2 -mt-4"
							/>
							<label htmlFor="newsletter" className="text-sm">
								I want to stay up-to-date and receive announcements and news from MyriadFlow.
							</label>
						</div>
						<button
							onClick={handleSubmit}
							className={`w-full py-2 rounded-md text-black ${tosChecked && displayName && email
								? 'bg-[#30D8FF]'
								: 'bg-gray-300 cursor-not-allowed'
								}`}
							disabled={!tosChecked || !displayName || !email}
						>
							Finish Sign-Up
						</button>
						<button
							onClick={() => setShowForm(false)}
							className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black"
						>
							Disconnect
						</button>
					</div>
				</div>
			)}

			<div
				className="text-2xl md:text-4xl font-bold py-4 md:py-6"
				style={{
					textAlign: 'center',
					backgroundImage: 'linear-gradient(to right, #F45EC1, #F45EC1, #F45EC1, #4EB9F3, #4EB9F3, #4EB9F3)',
					WebkitBackgroundClip: 'text',
					backgroundClip: 'text',
					color: 'transparent',
				}}
			>
				Beyond Real World Assets.
			</div>

			<div
				className="flex flex-wrap justify-center bg-white p-10 md:p-10"
				style={{
					width: '100%',
					height: 'auto',
				}}
			>
				<img
					src='./image 41.png'
					className="w-32 h-auto md:w-44 pb-8"
					style={{
						zIndex: '1',
					}}
				/>
				<img
					src='./image 51.png'
					className="w-32 h-auto md:w-44 pb-8"
					style={{
						zIndex: '2',
					}}
				/>
				<img
					src='./2_small 1.png'
					className="w-32 h-auto md:w-44 pb-8"
					style={{
						zIndex: '3',
					}}
				/>
				<img
					src='./image 9.png'
					className="w-32 h-auto md:w-44 pb-8"
					style={{
						zIndex: '4',
					}}
				/>
				<img
					src='./image 10.png'
					className="w-32 h-auto md:w-44 pb-8 hidden md:block"
					style={{
						zIndex: '5',
					}}
				/>
				<img
					src='./image 13.png'
					className="w-32 h-auto md:w-44 pb-8 hidden md:block"
					style={{
						zIndex: '6',
					}}
				/>
				<img
					src='./image 11.png'
					className="w-32 h-auto md:w-44 pb-8 hidden md:block"
					style={{
						zIndex: '7',
					}}
				/>
				<img
					src='./image 14.png'
					className="w-32 h-auto md:w-44 pb-8 hidden md:block"
					style={{
						zIndex: '8',
					}}
				/>
			</div>


			<div className='pt-10 bg-white px-10 hidden md:block'>
				<MostLoved collectionsdata={collections} />
			</div>

			{/* <div className='pt-40 bg-white px-10'>
				<LatestNFTs hotnftdata={phygitals} />
			</div> */}

			{/* <div className='pt-40 bg-white hidden md:block'>
				<LeaderBoard />
			</div>

			<div className='pt-40 bg-white px-10'>
				<HotNFTs hotnftdata={phygitals} />
			</div>

			<div className='pt-40 bg-white px-10 hidden md:block'>
				<Brand brandsdata={brands} />
			</div> */}

			{/* <div className='bg-white hidden md:block'>
				<CreateBanner />
			</div> */}

			<div className='bg-white pt-20'>
				<Footer />
			</div>


			{loading && (
				<div
					style={{
						//   backgroundColor: "#222944E5",
						display: "flex",
						overflowY: "auto",
						overflowX: "hidden",
						position: "fixed",
						inset: 0,
						zIndex: 50,
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						maxHeight: "100%",
					}}
					id="popupmodal"
				>
					<div style={{ position: "relative", padding: "1rem", width: "100%", maxHeight: "100%" }}>
						<div style={{ position: "relative" }}>
							<div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
								<img
									src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
									alt="Loading icon"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

		</div>
	)
}
