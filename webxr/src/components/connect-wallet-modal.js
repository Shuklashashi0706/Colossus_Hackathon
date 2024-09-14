import React from 'react'
import Link from 'next/link'
import { ConnectWallet } from './connect-wallet'

export const ConnectWalletModal = () => {
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
					maxHeight: 'fix-content',
				}}
				id='popupmodal'
			>
				<div
					style={{
						position: 'relative',
						padding: '16px',
						width: '100%',
						maxWidth: '32rem',
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

						<div>
							<p
								style={{
									fontSize: '1.2rem',
									textAlign: 'center',
									fontWeight: '600',
								}}
							>
								Connect wallet to claim NFT and <br></br>unlock the experience
							</p>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: '20px',
								paddingBottom: '20px',
							}}
						>
							{/* <ConnectWallet /> */}

							<ConnectWallet />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
