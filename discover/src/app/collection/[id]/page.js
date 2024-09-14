"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HotNftCard from "../../../components/hotNftCard";
import Header1 from '../../../components/header1';
import Footer from '../../../components/footer';

const Collection = ({ params }) => {
  const id = params?.id;

  const [phygitals, setPhygitals] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [brandid, setBrandId] = useState("");
  const [logo, setLogos] = useState("");

  useEffect(() => {
    const brandMatch = async () => {
      setLoading(true);
      const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

      try {
        const res = await fetch(`${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const brands = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok || !phyres.ok || !brands.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await res.json();
        const phygitals = await phyres.json();
        const brandData = await brands.json();

        // Find the corresponding brand in result
        const matchedBrand = result.find(coll => coll.id === id);
        if (matchedBrand) {
          setCollections(matchedBrand);
        }

        // Filter collections by the brand id
        const matchedCollections = phygitals.filter(phygital => phygital.collection_id === id);

        setPhygitals(matchedCollections);

        const matchedBrandLogo = brandData.find(brand => brand.id === matchedBrand.brand_id);
        if (matchedBrandLogo) {
          setLogos(matchedBrandLogo.logo_image);
          setDesc(matchedBrandLogo.description);
          setBrandId(matchedBrandLogo.id);
          setName(matchedBrandLogo.name);
        }

        setLoading(false);

        console.log("brand", matchedBrand, matchedCollections, matchedBrandLogo);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    brandMatch();
  }, [id]);

  return (
    <>
      <Header1 />
      <div className="relative text-center pt-24 md:pt-32">
        <img
          src={`https://nftstorage.link/ipfs/${collections?.cover_image?.slice(7)}`}
          alt={collections?.name}
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover object-center"
        />
        <img
          src={`https://nftstorage.link/ipfs/${collections?.logo_image?.slice(7)}`}
          alt={collections?.name}
          className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-32 sm:w-40 md:w-48 lg:w-56 rounded-lg"
        />
      </div>

      <div className="mx-4 md:mx-4 lg:mx-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="font-bold text-xl md:text-3xl lg:text-4xl text-black">
            {collections?.name}
          </div>

          <Link href="/collections" className="border mt-4 md:mt-0"
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
            <div style={{ marginTop: '4px', fontSize: '16px' }}>SHARE</div>
          </Link>
        </div>

        <div className="text-lg md:text-xl lg:text-2xl flex flex-col md:flex-row justify-between mt-8">
          <div className="mt-4 w-full md:w-1/2">
            {collections?.description}
          </div>

          <div className="mt-4 flex flex-row gap-4 relative">
            <div>Launched By: <br />{name}</div>
            <img
              src={`https://nftstorage.link/ipfs/${logo?.slice(7)}`}
              alt="New Icon"
              className="w-32 h-32 md:w-40 md:h-40"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />

            {isHovered && (
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  position: 'absolute',
                  top: '40%', // Adjust position based on your design
                  right: '5%',
                  transform: 'translateX(-50%)',
                  backgroundImage: 'linear-gradient(120deg, rgba(48, 216, 255, 0.8) 0%, rgba(194, 67, 254, 0.8), rgba(194, 67, 254, 0.8))',
                  color: 'black',
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '15px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  zIndex: 20,
                  width: '300px',
                  color: 'white'
              }}
              >
                <div className="text-sm">{desc}</div>
                <Link href={`/brand/${brandid}`} className="block mt-4 text-sm border border-white rounded-full py-1 px-4">
                  View brand page
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="font-bold text-2xl md:text-3xl lg:text-4xl text-black mt-16">
          Phygitals
        </div>

        <div className='mt-10 flex flex-wrap gap-4 md:gap-6 lg:gap-8'>
          {phygitals?.map((nft, index) => (
            <HotNftCard key={index} nft={nft} />
          ))}
        </div>
      </div>

      <div className='pt-20'>
        <Footer />
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            overflowY: "auto",
            overflowX: "hidden",
            position: "fixed",
            inset: 0,
            zIndex: 50,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxHeight: "100%",
          }}
          id="popupmodal"
        >
          <div style={{ position: "relative", padding: "1rem", width: "100%", maxHeight: "100%" }}>
            <div style={{ position: "relative", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <img
                  src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                  alt="Loading icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Collection;
