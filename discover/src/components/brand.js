import React from "react";
import Link from "next/link";

const Brand = ({ brandsdata }) => {
  const limitedBrands = brandsdata?.slice(0, 12);

  return (
    <div className="p-4 sm:p-2 lg:p-2">
      <div className="font-bold text-3xl sm:text-4xl lg:text-6xl ">
        Brand Champions
      </div>
      <div
        className="flex flex-col sm:flex-row justify-between text-lg sm:text-xl lg:text-2xl mt-6"
      >
        <div className="mt-4 sm:text-left">
          Pushing the Boundaries of Innovation.
        </div>
        <Link
          href="/brands"
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
            textAlign: "center",
          }}
        >
          <div style={{ marginTop: '4px' }}>View All</div>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 lg:mt-10 pb-10">
        {limitedBrands?.map((brand, index) => (
          <Link href={`/brand/${brand.id}`} key={index} className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <img
                src={`https://nftstorage.link/ipfs/${brand.logo_image.slice(7)}`}
                alt={brand.name}
                className="w-40 sm:w-48 lg:w-60"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <div
                className="text-center mt-4"
                style={{ fontSize: '1.5rem'}}
              >
                {brand.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brand;
