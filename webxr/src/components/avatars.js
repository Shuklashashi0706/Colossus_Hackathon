'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@readyplayerme/visage'

const HotNftCard = ({ nft }) => {
	
	return (
		<div style={{ position: 'relative', display: 'inline-block' }}>
			{/* <Link href={`https://webxr.myriadflow.com/${nft.phygital_id}`}> */}
			<Link href={`http://localhost:3000/${nft.phygital_id}`}>
				<div style={{ 
					width: '330px', 
					borderRadius: '30px', 
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
					overflow: 'hidden', 
					cursor: 'pointer', 
					position: 'relative' // Ensure the pseudo-element is positioned correctly
				}}>
					<div style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'white',
						borderRadius: '30px', // Ensure the pseudo-element has the same border radius
						opacity: 0.3,
						pointerEvents: 'none', // Allow clicks to pass through to the link
						zIndex: 1 // Ensure the pseudo-element is behind the content
					}}></div>
					<div style={{ position: 'relative', zIndex: 2 }}>
						<Avatar modelSrc={nft?.url} cameraInitialDistance={0.5} />
					</div>
				</div>
			</Link>
		</div>
	)
}

export default HotNftCard
