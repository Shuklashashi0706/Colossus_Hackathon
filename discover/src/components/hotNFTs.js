'use client'
import React from 'react'
import HotNftCard from './hotNftCard'
import Link from 'next/link'

const HotNFTs = ({ hotnftdata }) => {
	return (
		<div className='p-4 sm:p-2 lg:p-2'>
			<div className='font-semibold text-xl sm:text-2xl lg:text-3xl' style={{ color: '#DF1FDD' }}>
				Most Loved NFTs Now
			</div>
			<div className='font-bold text-3xl sm:text-4xl lg:text-6xl mt-6 sm:mt-8 lg:mt-10 lg:text-left'>
				Hot NFTs
			</div>
			<div className='flex flex-col sm:flex-row justify-between text-lg sm:text-xl lg:text-2xl mt-4'>
				<div className='mt-4 sm:text-left'>
					Trending Treasures: Get in on the Action with These Phygitals Making Waves and Potentially Shaping the Future.
				</div>
				<Link
					href="/hotphygitals"
					className="border mt-4 sm:mt-0"
					style={{
						background: 'transparent',
						border: '6px solid transparent',
						borderRadius: '8px',
						backgroundImage: `
							linear-gradient(white, white),
							linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
						`,
						backgroundOrigin: 'border-box',
						backgroundClip: 'content-box, border-box',
						WebkitBackgroundClip: 'content-box, border-box', // For Safari
						display: 'block',
						width: '180px',
						height: '50px',
						textAlign: 'center',
					}}
				>
					<div style={{ marginTop: '4px' }}>View All</div>
				</Link>
			</div>

			<div className='mt-10 flex flex-wrap justify-center gap-6 lg:gap-8'>
				{hotnftdata?.slice(-8).map((nft, index) => (
					<HotNftCard key={index} nft={nft} />
				))}
			</div>
		</div>
	)
}

export default HotNFTs
