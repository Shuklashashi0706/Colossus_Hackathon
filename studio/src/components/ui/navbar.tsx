"use client";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from './navigation-menu'
import { Logo } from './logo'
import { Button } from './button'
import { toast, ToastContainer } from 'react-toastify'
import { useAccount, useDisconnect } from 'wagmi'
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"
import Link from 'next/link'

export const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const pathname = usePathname();
	const [name, setName] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

	useEffect(() => {
		const getUserData = async () => {
			if (address) {
				try {
					const response = await fetch(`${baseUri}/profiles/wallet/${address}`, {
						method: 'GET',
						headers: {
							'content-Type': 'application/json',
						},
					});

					if (response.ok) {
						const data = await response.json();
						setName(data.name);
						setProfileImage(data.profile_image);
					} else {
						console.log('No user found');
					}
				} catch (error) {
					console.error('Error fetching user data', error);
				}
			}
		};
		getUserData();
	}, [address]);

	const navlinks = [
		{ title: 'Home', path: '#' },
		{ title: 'Discover', path: '#' },
		{ title: 'Studio', path: '#' },
	];

	const Notification = () => {
		if (!address) {
			toast.warning("Currently works with Metamask and Coinbase Wallet Extension. We are working on Smart Wallet functionality.", {
				containerId: "containerA",
				position: 'top-left',
			}
			)
		}
	};
	const handleLogout = () => {
		disconnect();
	};


	return (
		<>

			<NavigationMenu className='nav max-w-screen flex items-center justify-between px-8 py-6 relative'>
				<a href="/">
					<p className=' text-black text-2xl  font-bold'>MetaEngage</p>
				</a>
				<NavigationMenuList className='flex gap-8 items-center text-white text-lg'>
					{navlinks.map((link, index) => (
						<Link href={link.path} key={index}>
							<NavigationMenuItem>{link.title}</NavigationMenuItem>
						</Link>
					))}
					<div className=" flex" style={{ gap: '20px', marginRight: '80px' }}>
						{address ? (
							<>
								{/* User Section */}
								<div className="relative">
									<button
										className="space-x-2"
										onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									>
										<img
											src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"}
											alt="Profile"
											style={{ width: '40px', height: '40px', borderRadius: '30px' }}
										/>
									</button>

									{isDropdownOpen && (
										<div
											className="absolute right-10 mt-2 p-6 bg-white rounded-lg shadow-xl"
											style={{ zIndex: 10, display: 'flex', flexDirection: 'column', width: '250px' }}
										>

											<div className="flex items-center px-4 py-2">
												<img
													src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"}
													alt="Profile"
													style={{ width: '40px', height: '40px', marginRight: '6px', borderRadius: '30px' }}
												/>
												<div className="flex flex-col">
													<span className="text-lg font-semibold text-black">{name}</span>
													<Link href="#" className="text-sm text-gray-500 hover:underline">
														View profile
													</Link>
												</div>
											</div>


											{/* <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												My assets
											</Link>
											<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												On sale
											</Link>
											<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												My brands
											</Link>
											<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												My collections
											</Link>
											<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												Activity
											</Link>
											<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												Rewards
											</Link>
											<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												Create
											</Link>
											<Link href="/profile-setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
												Profile Settings
											</Link> */}

											{/* Wallet Address */}
											<div className="px-4 py-2 text-xs text-gray-500 truncate-wallet">
												{address}
											</div>

											{/* Separator */}
											<div className="border-t border-gray-200 my-2"></div>

											{/* Logout Button */}
											<button
												onClick={handleLogout}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
											>
												Log out
											</button>
										</div>
									)}

								</div>
							</>
						) : (
							<div onClick={Notification}>
								<w3m-button />
							</div>
						)}
					</div>
				</NavigationMenuList>
			</NavigationMenu>
			<ToastContainer className="absolute top-0 right-0 " containerId="containerA" />
		</>

	)
}
