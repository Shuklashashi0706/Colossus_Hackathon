'use client'
import Link from 'next/link'
import { ClaimNftPopUp } from './claim-nft-popup'
import Image from 'next/image'
import { useAccount, useChainId } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import { simulateContract, writeContract } from '@wagmi/core'
import { useState } from 'react'
import { X } from 'lucide-react'
import { ConnectWallet } from './connect-wallet'
import { config } from '@/lib/wagmi'
import reward from '@/lib/reward.json'

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

export const ClaimNft = ({
	onClose,
	freeNft,
	brandName,
	contractAddress,
	chainTypeId,
	collectionId,
	phygitalName,
	phygitalId,
}) => {
	const [claimNft, setClaimNft] = useState(false)
	const [brandId, setBrandId] = useState('')
	const account = useAccount()

	const handleClick = () => {
		onClose(false)
	}

	const createFanToken = async () => {
		console.log('running...')
		const abi = reward.abi
		const { request } = await simulateContract(config, {
			abi,

			address: '0x771C15e87272d6A57900f009Cd833b38dd7869e5',
			functionName: 'createFanToken',
			args: [String(contractAddress), 1, 1, '0x0', 'www.xyz.com'],
		})
		const hash = await writeContract(config, request)

		if (hash) {
			const res = await fetch(`${baseUri}/fantoken`, {
				method: 'POST',
				body: JSON.stringify({
					brand_id: brandId,
					collection_id: collectionId,
					phygital_id: phygitalId,
					phygital_name: phygitalName,
					chaintype_id: chainTypeId,
					fan_token_id: hash,
				}),
			})

			const result = await res.json()

			if (result) {
				setClaimNft(true)
			}
		}
	}

	const removePrefix = (uri) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<div>
			<ToastContainer />
			{!claimNft ? (
				<div
					style={{
						//   backgroundColor: "#FFFFFFB2",
						display: 'flex',
						overflowY: 'auto',
						overflowX: 'hidden',
						position: 'fixed',
						inset: 0,
						zIndex: 50,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						maxHeight: 'fit-content',
					}}
					id='popupmodal'
				>
					<div
						style={{
							position: 'relative',
							padding: '16px',
							width: '100%',
							maxWidth: '50rem',
							maxHeight: '100%',
						}}
					>
						<div
							style={{
								position: 'relative',
								borderRadius: '0.5rem',
								boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)',
								color: 'black',
								background: 'white',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									padding: '16px',
									borderRadius: '20px',
									borderColor: '#4B5563',
								}}
							>
								<X
									color='#000'
									style={{ cursor: 'pointer' }}
									onClick={handleClick}
								/>
							</div>

							<div style={{ padding: '16px', spaceY: '16px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<p
										style={{
											backgroundImage:
												'linear-gradient(90deg, #30D8FF, #5B0292)',
											WebkitBackgroundClip: 'text',
											backgroundClip: 'text',
											color: 'transparent',
											// paddingTop: "60px",
											fontSize: '2.5rem',
											textAlign: 'center',
											fontWeight: 'bold',
										}}
									>
										Congratulations!
									</p>
								</div>

								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<img src='./trophy2.png' />

									<Image
										src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
											freeNft
										)}`}
										alt='Free NFT Image'
										height={80}
										width={150}
										style={{ marginTop: '60px' }}
									/>
									<img src='./trophy1.png' />
								</div>

								<p
									style={{
										fontSize: '1.2rem',
										textAlign: 'center',
										padding: '40px',
									}}
								>
									You are eligible to claim a free NFT fan token to show your
									support to {brandName} and get a chance to earn weekly
									rewards.
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									paddingBottom: '60px',
								}}
							>
								<Link
									href=''
									type='button'
									style={{
										width: '30%',
										marginLeft: 'auto',
										marginRight: 'auto',
										color: 'black',
										focusRing: '4px',
										outline: 'none',
										borderRadius: '30rem',
										fontSize: '1.2rem',
										padding: '5px 0px',
										textAlign: 'center',
										backgroundColor: '#30D8FF',
									}}
									onClick={() => {
										if (!account.address) {
											toast.warning('Connect or Create a wallet')
										} else {
											createFanToken()
										}
									}}
								>
									Claim Free NFT
								</Link>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingBottom: '1rem',
									marginInline: 'auto',
								}}
							>
								{!account.address && <ConnectWallet />}
							</div>
						</div>
					</div>
				</div>
			) : (
				<ClaimNftPopUp
					onClose={onClose}
					brandName={brandName}
					freeNft={freeNft}
				/>
			)}
		</div>
	)
}
