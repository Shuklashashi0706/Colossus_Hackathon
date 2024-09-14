"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { abi } from "./abi/abi";
import { useAccount, useChainId } from 'wagmi';

const ProfileNftCard = ({ nft }) => {

  const [logo, setLogos] = useState("");
  const [desc, setdesc] = useState("");
  const [brandid, setbrandid] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const chainId = useChainId();
  const account = useAccount();
  const walletAddress = account.address;

  useEffect(() => {
    const brandmatch = async () => {
      const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

      try {
        const res = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
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

        if (!res.ok || !phyres.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(res);
        

        const result = await res.json();
        const phyresult = await phyres.json();

        // Find the phyresult item matching the targetId
        const matchingPhy = phyresult.find(phy => phy.id === nft?.id);

        if (matchingPhy) {
          // Find the corresponding brand in result
          const matchedBrand = result.find(brand => brand.name === matchingPhy.brand_name);
          if (matchedBrand) {
            setLogos(matchedBrand.logo_image);
            setdesc(matchedBrand.description);
            setbrandid(matchedBrand.id);
          }
        }

        // console.log("logo", logo, result, phyresult);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    brandmatch();
  }, [])



  useEffect(() => {
    const pricetoUSD = async () => {
      // Fetch the current ETH to USD conversion rate
      const conversionRateRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');

      if (!conversionRateRes.ok) {
        throw new Error('Failed to fetch ETH to USD conversion rate');
      }

      const conversionRateResult = await conversionRateRes.json();
      const ethToUsdRate = conversionRateResult.ethereum.usd;

      console.log("Current ETH to USD rate:", ethToUsdRate);

      // Convert the lowest price from ETH to USD
      const lowestPriceInUSD = nft?.price * ethToUsdRate;
      console.log("The lowest price in USD is:", lowestPriceInUSD.toFixed(2));
      setPriceUSD(lowestPriceInUSD.toFixed(2));
    }

    pricetoUSD();
  }, [])



  const buyasset = async () => {
    setLoading(true);
    try {

      if (typeof window !== "undefined" && window.ethereum && walletAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const contract = new ethers.Contract(
          `${nft?.contract_address}`,
          abi,
          provider.getSigner()
        )

        const tx = await contract.mint(1, { value: ethers.utils.parseEther(nft?.price.toString()) });

        const result = await tx.wait();

        console.log("Result:", result);
        setLoading(false);
        window.location.href = `/confirm/${nft?.id}`;
      }
      else {
        toast.warning('Connect your wallet');
        setLoading(false);
      }

    } catch (error) {
      console.error("Error handling buy asset:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };


  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Main Link for NFT */}
      <Link href={`/nfts/${nft.id}`}>
        <div
          style={{
            width: "330px",
            borderRadius: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={`https://nftstorage.link/ipfs/${nft?.image.slice(7)}`}
              className="rounded"
              style={{ padding: "20px", borderRadius: '30px' }}
              alt="Gold Headphones"
            />
          </div>

          <div
            className="flex justify-between"
            style={{ paddingLeft: "20px", paddingRight: "20px", justifyContent: 'space-between' }}
          >
            <div className="font-bold text-lg">{nft?.name}</div>
            <div>...</div>
          </div>

          <div
            className="flex justify-between mt-4"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
              justifyContent: 'space-between'
            }}
          >
            {nft?.product_url ?
              (
                <div
                  className="text-lg"
                  style={{
                    border: "1px solid black",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                    gap: '4px',
                    paddingLeft: '25px',
                    paddingRight: '25px',
                    marginBottom: '25px'
                  }}
                >
                  <div>Buy</div>
                  <img style={{ width: '25px' }} src="/shopify.png" alt="Buy Icon" />
                </div>
              ) :
              (
                <div>
                  <div className="text-2xl">{nft?.price} ETH</div>
                  <div>{priceUSD} USD</div>
                </div>
              )}
            {nft?.product_url &&
              (
                <div
                  className="px-10 text-lg"
                  style={{
                    backgroundColor: "#DF1FDD36",
                    border: "1px solid black",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  Claim
                </div>
              )}
          </div>
        </div>
      </Link>

      {/* Brand Logo and Hover Effect */}
      <img
        src={`https://nftstorage.link/ipfs/${logo?.slice(7)}`}
        alt="New Icon"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "50px",
          height: "50px",
          borderRadius: '50px',
          zIndex: 1
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {isHovered && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
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
          <div style={{ display: 'flex', gap: '20px' }}>
            <img
              src={`${"https://nftstorage.link/ipfs"}/${logo?.slice(7)}`}
              style={{ width: '80px', borderRadius: '100px' }}
            />
            {/* <div className="font-bold mt-6">{onephygital?.brand_name}</div> */}
          </div>
          <div className="mt-4" style={{ fontSize: '13px', marginBottom: '20px' }}>{desc}</div>
          <Link href={`/brand/${brandid}`} style={{ fontSize: '15px', border: '1px solid white', borderRadius: '30px', padding: '4px' }}>View brand page</Link>
        </div>
      )}

      {/* Web XR Link */}
      <Link href={`https://webxr.myriadflow.com/${nft?.id}`} target="_blank"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px 20px",
          borderRadius: "10px",
          border: '1px solid black',
          background: 'white',
          zIndex: 1
        }}
      >
        Web XR
      </Link>

      {!nft?.product_url &&
        (
          <div>
            <div
              style={{
                color: "#DF1FDD",
                position: "absolute",
                bottom: "60px",
                right: "20px",
                fontSize: '15px'
              }}
            >
              {nft?.amount_bought} Copies Bought
            </div>

            <button
              className="px-10 text-lg"
              style={{
                backgroundColor: "#DF1FDD36",
                border: "1px solid black",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                position: "absolute",
                bottom: "25px",
                right: "20px",
              }}
              onClick={buyasset}
            >
              Buy
            </button>
          </div>
        )}

      <ToastContainer />

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
    </div>
  );

}

export default ProfileNftCard;
