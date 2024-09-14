import React from 'react'
import Link from 'next/link'

export const NfcMintPopUp = ({ onClose, phygitalName }) => {
	const handleClick = () => {
		onClose(false)
	}

	return (
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

					<div style={{ padding: '16px', spaceY: '16px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-around' }}>
							<img src='./trophy2.png' />
							<p
								style={{
									backgroundImage: 'linear-gradient(90deg, #30D8FF, #5B0292)',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
									color: 'transparent',
									paddingTop: '60px',
									fontSize: '2.5rem',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								Congratulations!
							</p>
							<img src='./trophy1.png' />
						</div>
						<p
							style={{
								fontSize: '1.2rem',
								textAlign: 'center',
								paddingTop: '20px',
							}}
						>
							You have successfully minted {phygitalName} phygital NFT!
						</p>
						<p
							style={{
								fontSize: '1.2rem',
								textAlign: 'center',
								padding: '40px',
								fontWeight: '600',
							}}
						>
							As the owner of {phygitalName} you are also the owner of this
							avatar!
						</p>
						<p
							style={{
								fontSize: '1.2rem',
								textAlign: 'center',
								paddingLeft: '40px',
								paddingRight: '40px',
							}}
						>
							You can customize the avatar and get a chance to compete against
							other avatars for weekly rewards on MyriadFlow leaderboard.
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							paddingTop: '20px',
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
								width: '30%',
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
	)
}
