import React, { useCallback } from 'react'
import { useConnect, useAccount, useDisconnect } from 'wagmi'

export const CreateWallet = () => {
	const { connectors, connect } = useConnect()
	const { address } = useAccount()
	const { disconnect } = useDisconnect()

	const createWallet = useCallback(() => {
		const coinbaseWalletConnector = connectors.find(
			(connector) => connector.id === 'coinbaseWalletSDK'
		)

		if (coinbaseWalletConnector) {
			connect({ connector: coinbaseWalletConnector })
		}
	}, [connectors, connect])

	return (
		<>
			{address ? (
				<div style={containerStyles}>
					<div style={addressStyles}>{address}</div>
					<button style={disconnectButtonStyles} onClick={disconnect}>
						Disconnect
					</button>
				</div>
			) : (
				<button style={buttonStyles} onClick={createWallet}>
					<svg
						width={26}
						height={26}
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M2.66675 15.9998C2.66675 23.3628 8.63712 29.3332 16.0001 29.3332C23.363 29.3332 29.3334 23.3628 29.3334 15.9998C29.3334 8.63687 23.363 2.6665 16.0001 2.6665C8.63712 2.6665 2.66675 8.63687 2.66675 15.9998ZM12.5927 11.7035H19.4075C19.9001 11.7035 20.2964 12.0998 20.2964 12.5924V19.4072C20.2964 19.8998 19.9001 20.2961 19.4075 20.2961H12.5927C12.1001 20.2961 11.7038 19.8998 11.7038 19.4072V12.5924C11.7038 12.0998 12.1001 11.7035 12.5927 11.7035Z'
							fill='white'
						/>
					</svg>
					<p>Connect Wallet</p>
				</button>
			)}
		</>
	)
}

const buttonStyles = {
	background: 'transparent',
	border: '1px solid transparent',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingInline: '2.5rem',
	fontFamily: 'Arial, sans-serif',
	fontWeight: 'bold',
	fontSize: 12,
	backgroundColor: '#0052FF',
	borderRadius: 10,
	cursor: 'pointer',
}

const containerStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}

const addressStyles = {
	backgroundColor: '#F0F0F0',
	border: '1px solid #DDD',
	borderRadius: 10,
	padding: '10px 20px',
	fontFamily: 'Arial, sans-serif',
	fontWeight: 'bold',
	fontSize: 18,
	textAlign: 'center',
	wordBreak: 'break-all',
	flex: 1,
}

const disconnectButtonStyles = {
	marginLeft: 10,
	backgroundColor: '#FF5C5C',
	color: 'white',
	border: 'none',
	borderRadius: 10,
	padding: '10px',
	cursor: 'pointer',
	fontWeight: 'bold',
}
