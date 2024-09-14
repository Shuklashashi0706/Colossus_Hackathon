import React from "react";
import MostRecentlyCard from "./mostRecentlyCard";

const mostRecently = ({collectionsdata}) => {
  return (
    <div>
      <div className="font-semibold" style={{ color: "#DF1FDD" }}>
        Most Recently Launched
      </div>
      <div className="font-bold text-black text-6xl mt-10">
      New on Discover
      </div>
      <div className="flex justify-between text-2xl" style={{justifyContent: 'space-between'}}>
        <div className="mt-4">
        New Frontier: Be Among the First to Discover the Newest Phygitals Making Their Debut!
        </div>
        <button className="border"
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
        }}
        >View All</button>
      </div>

      <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {collectionsdata?.slice().reverse().map((nft, index) => (
          <MostRecentlyCard key={index} nft={nft} />
        ))}
      </div>
      
    </div>
  );
};

export default mostRecently;
