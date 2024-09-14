import React from "react";
import MostLovedCard from "./mostLovedCard";
import Link from "next/link";

const MostLoved = ({ collectionsdata }) => {
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
  };

  return (
    <div id="movetotrends" className="p-4 md:p-4">
      <div className="font-semibold text-pink-500">
        Most Loved Right Now
      </div>
      <div className="font-bold text-black text-4xl md:text-6xl mt-4 md:mt-10">
        Trending Collections
      </div>
      <div className="text-lg md:text-2xl mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          Must-Have Mints: Don&apos;t Miss Out on These Top-Selling Phygitals Before
          They&apos;re Gone!
        </div>
        <div className="flex gap-4">
          <Link href="/collections" className="border"
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
            }}>
            <div style={{ marginTop: '4px' }}>View All</div>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        {collectionsdata?.slice(-8).map((nft, index) => (
          <MostLovedCard key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default MostLoved;
