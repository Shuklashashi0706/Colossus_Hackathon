import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const ClaimNftPopUp = ({ onClose, brandName, freeNft }) => {
	const handleClick = () => {
		onClose(false)
	}

	const removePrefix = (uri) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<div>
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
							{/* Add any additional content or buttons here */}
						</div>

						<div style={{ padding: '16px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-around' }}>
								<p
									style={{
										color: 'black',
										paddingTop: '0px',
										paddingLeft: '30px',
										fontSize: '2.5rem',
										textAlign: 'center',
										fontWeight: 'bold',
									}}
								>
									You Have Claimed Your Free NFT Fan Token
								</p>
								<img src='./trophy1.png' style={{ marginTop: '-40px' }} />
							</div>

							<div
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									paddingLeft: '40px',
								}}
							>
								<div>
									<Image
										src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
											freeNft
										)}`}
										alt='Free NFT Image'
										height={80}
										width={150}
										style={{ marginTop: '40px' }}
									/>
								</div>
								<div>
									<p
										style={{
											fontSize: '1.2rem',
											//   textAlign: "center",
											paddingTop: '0px',
											paddingLeft: '40px',
											paddingRight: '40px',
										}}
									>
										By owning this NFT, you show your support to {brandName}
										and help them reach higher on the MyriadFlow avatar
										leaderboard!
									</p>
									<p
										style={{
											fontSize: '1.2rem',
											paddingTop: '20px',
											paddingLeft: '40px',
											paddingRight: '40px',
											backgroundImage:
												'linear-gradient(90deg, #30D8FF, #DF1FDD, #5B0292)',
											WebkitBackgroundClip: 'text',
											backgroundClip: 'text',
											color: 'transparent',
											fontWeight: '600',
										}}
									>
										Rewards are distributed to top 3 avatar creators, owners and
										supporters each week.
									</p>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											paddingTop: '40px',
											paddingBottom: '30px',
										}}
									>
										<Link
											href=''
											type='button'
											style={{
												width: '40%',
												marginLeft: 'auto',
												marginRight: 'auto',
												color: 'black',
												focusRing: '4px',
												outline: 'none',
												borderRadius: '30rem',
												fontSize: '1.2rem',
												padding: '10px 0px',
												textAlign: 'center',
												backgroundColor: '#30D8FF',
											}}
										>
											View in my assets
										</Link>

										<Link
											href=''
											type='button'
											style={{
												width: '40%',
												marginLeft: 'auto',
												marginRight: 'auto',
												color: 'black',
												focusRing: '4px',
												outline: 'none',
												borderRadius: '30rem',
												fontSize: '1.2rem',
												padding: '10px 0px',
												textAlign: 'center',
												border: '1px solid #5B0292',
											}}
											onClick={handleClick}
										>
											Continue Experience
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
