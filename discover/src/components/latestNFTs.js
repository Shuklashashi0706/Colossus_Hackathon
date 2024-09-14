'use client'
import React from 'react'
import HotNftCard from './hotNftCard'
import Link from 'next/link'

const LatestNFTs = ({ hotnftdata }) => {
  const modifiedNftData = [...hotnftdata];
  if (modifiedNftData.length > 1) {
    const secondLastItem = modifiedNftData.splice(modifiedNftData.length - 2, 1)[0];
    modifiedNftData.push(secondLastItem);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-4">
      <div className="font-semibold text-[#DF1FDD] text-xl sm:text-2xl lg:text-3xl">
        Most Recently Launched
      </div>
      <div className="font-bold text-black text-4xl sm:text-5xl lg:text-6xl mt-6 sm:mt-8 lg:mt-10">
        New on Discover
      </div>
      <div className="flex flex-col sm:flex-row justify-between text-lg sm:text-xl lg:text-2xl mt-4">
        <div className="mt-4">
          New Frontier: Be Among the First to Discover the Newest Phygitals Making Their Debut!
        </div>
        <Link
          href="/newphygitals"
          className="border mt-4 sm:mt-0"
          style={{
            background: "transparent",
            border: "6px solid transparent",
            borderRadius: "8px",
            backgroundImage: `
              linear-gradient(white, white),
              linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
            `,
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
            WebkitBackgroundClip: "content-box, border-box", // For Safari
            display: "block",
            width: "180px",
            height: "50px",
            textAlign: 'center',
          }}
        >
          <div className="flex items-center justify-center h-full" style={{ marginTop: '4px' }}>
            View All
          </div>
        </Link>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap gap-4 sm:gap-6 justify-center">
        {hotnftdata
          ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 8)
          .map((nft, index) => (
            <HotNftCard key={index} nft={nft} />
          ))}
      </div>
    </div>
  )
}

export default LatestNFTs
