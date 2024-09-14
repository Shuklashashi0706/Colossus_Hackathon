"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import MostLovedCard from "../../../components/mostLovedCard";
import HotNftCard from "../../../components/hotNftCard";
import Header1 from '../../../components/header1'
import Footer from '../../../components/footer'

const Brand = ({params}) => {

    const id = params?.id;

    const [brand, setBrand] = useState([]);
    const [collections, setcollections] = useState([]);
    const [nfts, setnfts] = useState([])
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const brandmatch = async() => {
          setloading(true);
         const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';
     
     try {
       const res = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
       });
     
       const phyres = await fetch(`${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
       });

       const nfts = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
     
       if (!res.ok || !phyres.ok || !nfts.ok) {
         throw new Error('Failed to fetch data');
       }
     
       const result = await res.json();
       const collections = await phyres.json();
       const phynfts = await nfts.json();
     
         // Find the corresponding brand in result
         const matchedBrand = result.find(brand => brand.id === id);
         if (matchedBrand) {
           setBrand(matchedBrand);
         }

         // Filter collections by the brand id
  const matchedCollections = collections.filter(collection => collection.brand_id === id);

  // Extract the IDs of the matched collections
const matchedCollectionIds = matchedCollections.map(collection => collection.id);

// Filter NFTs by the matched collection IDs
const matchedNFTs = phynfts.filter(nft => matchedCollectionIds.includes(nft.collection_id));

  setcollections(matchedCollections);
  setnfts(matchedNFTs)
  setloading(false);
     
       console.log("phynfts", phynfts);
     
     } catch (error) {
       console.error('Error fetching data:', error);
       setloading(false);
     }
        }
     
        brandmatch();
       }, [])

       
  return (
<>
<div
				className=''
				style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
			>
				<Header1 />
			</div>
<div style={{ position: "relative", textAlign: "center", paddingTop:'90px' }}>
      <img
        src={`${
          "https://nftstorage.link/ipfs"
        }/${brand?.cover_image?.slice(7)}`}
        alt={brand?.name}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          height:'90vh',
          width:'100vw',
          objectFit: 'cover',
          transform: 'scale(1)',  // Zooms in the image
          objectPosition: 'center', 
        }}
      />

      <img
        src={`${
          "https://nftstorage.link/ipfs"
        }/${brand?.logo_image?.slice(7)}`}
        alt={brand?.name}
        style={{
          width: "350px",  // Adjust the width as needed
          borderRadius:'20px',
          position: "absolute",
          bottom: "20px",  // Adjust the offset from the bottom as needed
          left: "20px",  // Adjust the offset from the left as needed
        }}
      />
    </div>

    <div style={{marginLeft:'40px', marginRight: '40px', marginTop:'100px'}}>

        <div className="font-bold text-black" style={{fontSize:'40px'}}>
      {brand?.name}
      </div>
      <div
        className="text-2xl flex"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mt-4 w-1/2">
        {brand?.description}
        </div>

        <Link href="" className="border"
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
          textAlign:'center',
        }}
        >
          <div style={{marginTop: '4px'}}>SHARE</div></Link>

      </div>


  <div style={{ display: 'flex', flexWrap: 'wrap', float:'right', maxWidth: '200px' ,marginTop:'30px', gap: '8px'}}>
          {brand.website && (
            <a href={brand.website} target="_blank" rel="noopener noreferrer">
              <img src='/website.png' style={{ height: '30px', width: '30px' }} alt="Website" />
            </a>
          )}
          {brand.twitter && (
            <a href={brand.twitter} target="_blank" rel="noopener noreferrer">
              <img src='/x.png' style={{ height: '30px', width: '30px' }} alt="Website" />
            </a>
          )}
          {brand.instagram && (
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
              <img src='/insta.png' style={{ height: '30px', width: '30px' }} alt="Website" />
            </a>
          )}
          {brand.facebook && (
            <a href={brand.facebook} target="_blank" rel="noopener noreferrer">
              <img src='/facebook.png' style={{ height: '30px', width: '30px' }} alt="Website" />
            </a>
          )}
          {brand.discord && (
            <a href={brand.discord} target="_blank" rel="noopener noreferrer">
              <img src='/discord.png' style={{ height: '30px', width: '30px' }} alt="Website" />
            </a>
          )}
         {brand.additional_link && brand.additional_link === 'whatsapp' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/whatsapp.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'youtube' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/youtube.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'telegram' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/telegram.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'linkedin' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/linkedin.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'google' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/google.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'tiktok' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/tiktok.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'snapchat' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/snapchat.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}
          {brand.additional_link && brand.additional_link === 'pinterest' && (
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img src='/pinterest.png' style={{ height: '30px', width: '30px' }} alt="WhatsApp" />
            </a>
          )}

  </div>


      <div className="font-bold text-black text-4xl" style={{marginTop:'100px'}}>Collections</div>

        <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
        {collections?.map((nft, index) => (
          <MostLovedCard key={index} nft={nft} />
        ))}
      </div>

      <div className="font-bold text-black text-4xl" style={{marginTop:'100px'}}>Phygitals</div>

      <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
        {nfts?.map((nft, index) => (
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
      // backgroundColor: "#222944E5",
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
  )
}

export default Brand;