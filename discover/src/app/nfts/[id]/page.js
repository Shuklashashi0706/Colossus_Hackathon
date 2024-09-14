"use client"
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Head from "next/head";
import { Avatar } from '@readyplayerme/visage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { abi } from "../../../components/abi/abi";
import {useAccount, useChainId } from 'wagmi';
import Moralis from 'moralis';
import Header1 from "@/components/header1";
import axios from 'axios';
const NFTPage = ({ params }) => {
  const id = params?.id;

  const [isHovered, setIsHovered] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [priceUSD, setPriceUSD] = useState("");
  const [avatarUrl, setAvatarUrl] = useState('');
  const [logos, setLogos] = useState("");
  const [brandDesc, setbrandDesc] = useState("");
  const [brandid, setbrandid] = useState("");
  const [loading, setLoading] = useState(false);
  const [sold, setsold] = useState(0);

  const chainId = useChainId();
  const account = useAccount();
  const walletAddress = account.address;

  const [activeTab, setActiveTab] = useState('Color'); // Default tab

  const tabs = ['Color', 'Size', 'Weight', 'Material', 'Usage', 'Unique Qualities', 'Manufacturer', 'Made In'];

  const handleClaimClick = () => {
    setShowPopover(true);
    setTimeout(() => {
      setShowPopover(false);
    }, 6000); // Pop-over will disappear after 3 seconds
  };


  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development'

	const apiUrl = isDevelopment
		? 'http://localhost:3000' // Local development URL
		: 'https://discover.myriadflow.com' // Production URL

	const [onephygital, setonePhygital] = useState([]);

	const getBrands = async () => {

    setLoading(true);

    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

		  const phyres = await fetch(`${baseUri}/phygitals/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			});

		const phyresult = await phyres.json()
		setonePhygital(phyresult);

    const avatar = await fetch(`${baseUri}/avatars/all/554b4903-9a06-4031-98f4-48276c427f78`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			});

		const avatardata = await avatar.json();

		console.log("avatar", avatardata, phyresult);

    const selectedAvatar = avatardata.find(avatar => avatar.phygital_id === id);

    // If found, update the state with the avatar URL
    if (selectedAvatar) {
      setAvatarUrl(selectedAvatar.url);
    }
    setLoading(false);
	}

	useEffect(() => {
		getBrands()
	}, [])

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // You can customize the format further if needed
  };


  useEffect(() => {
    const pricetoUSD = async() => {
       // Fetch the current ETH to USD conversion rate
  const conversionRateRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    
  if (!conversionRateRes.ok) {
    throw new Error('Failed to fetch ETH to USD conversion rate');
  }
  
  const conversionRateResult = await conversionRateRes.json();
  const ethToUsdRate = conversionRateResult.ethereum.usd;
 
  const lowestPriceInUSD = onephygital?.price * ethToUsdRate;
  setPriceUSD(lowestPriceInUSD.toFixed(2));
    }
  
   pricetoUSD();
  }, [onephygital])

const shareOnTwitter = (url, text, imageUrl = '') => {
  const twitterBaseUrl = 'https://twitter.com/intent/tweet';
  const params = new URLSearchParams({
    url:`${imageUrl}`,
    text: `${text}`,
  });
  window.open(`${twitterBaseUrl}?${params.toString()}`, '_blank');
};

  const handleShare = () => {
    const url = window.location.href; // The URL you want to share
    const imageUrl = `https://nftstorage.link/ipfs/bafkreihbqwvmszwvvrwah3lzankgraxmrwo7kasrl3xx64huij5zy6gmmm`;

    const text = `Check this out🤩\nCoolest Phygital on Discover | Myriadflow✨\n\n${url}\n\n#Myriadflow #Discover #Phygitals #NFTs #Collections\n`;

    shareOnTwitter(url, text, imageUrl);
  };

  useEffect(() => {
    const brandmatch = async() => {
     const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';
 
 try {
   const res = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     }
   });
 
   if (!res.ok) {
     throw new Error('Failed to fetch data');
   }
 
   const result = await res.json();
 
     const matchedBrand = result.find(brand => brand.name === onephygital.brand_name);
     if (matchedBrand) {
       setLogos(matchedBrand.logo_image);
       setbrandDesc(matchedBrand.description);
       setbrandid(matchedBrand.id);

       const fetch = async() => {

        try {
          await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY
          });
      
          const response = await Moralis.EvmApi.events.getContractEvents({
          "chain": chainId,
          "order": "DESC",
          "topic": "0x328ff68d0e66694e405c9f8fc906a346b345aa1f87ec216eaa82f2c654d0d34a",
          "address": `${onephygital?.contract_address}`,
          "abi": {
          "anonymous": false,
          "inputs": [
          {
            "indexed": false,
            "name": "currentIndex",
            "type": "uint256",
            "internal_type": "uint256"
          },
          {
            "indexed": false,
            "name": "quantity",
            "type": "uint256",
            "internal_type": "uint256"
          },
          {
            "indexed": true,
            "name": "creator",
            "type": "address",
            "internal_type": "address"
          }
          ],
          "name": "PhygitalAAssetCreated",
          "type": "event"
        }
          });

          if(response.raw.result[0])
          {
          setsold(response.raw.result[0].data.currentIndex);
          }
        } catch (e) {
          console.error(e);
        }
      
      
        }

        fetch();
     }
  
 } catch (error) {
   console.error('Error fetching data:', error);
 }
    }
 
    brandmatch();
   }, [onephygital])

   const buyasset = async () => {
    setLoading(true);

    try {

      if (typeof window !== "undefined" && window.ethereum && walletAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const contract = new ethers.Contract(
          `${onephygital?.contract_address}`,
          abi ,
          provider.getSigner()
        )

        const tx = await contract.mint(1 , {value: ethers.utils.parseEther(onephygital?.price.toString()) });
        const result = await tx.wait();
        setLoading(false);
        window.location.href = `/confirm/${id}`;
      }
      else
      {
        toast.warning('Connect your wallet');
        setLoading(false);
      }

    } catch (error) {
      console.error("Error handling buy asset:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      phygital_id: onephygital.id,
      wallet_address: walletAddress,
      quantity: 1,
      name: onephygital.name,
      price: onephygital.price,
      image: onephygital.image,
      logo: logos,
    };
    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';
  
    try {
      const response = await axios.get(`${baseUri}/cart/${walletAddress}`);
      const cartItems = response.data;
  
      const existingItem = cartItems.find(item => item.phygital_id === onephygital.id);
  
      if (existingItem) {
        await axios.post(`${baseUri}/cart`, {
          phygital_id: onephygital.id,
          wallet_address: walletAddress,
          quantity: existingItem.quantity + 1
        });
      } else {
        await axios.post(`${baseUri}/cart`, cartItem);
      }
  
      toast.success('Added to Cart!');
    } catch (error) {
      toast.error('Failed to add to cart. Please try again.');
      console.error('Error adding to cart:', error);
    }
  };
  

  return (
    <div>
      <Head>
			<title>Discover | MyriadFlow</title>
			<meta name="description" content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life." />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`https://discover.myriadflow.com/nfts/${onephygital?.id}`} />
			<meta property="og:title" content="Discover | MyriadFlow" />
			<meta property="og:description" content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life." />
			<meta property="og:image" content={`${
              "https://nftstorage.link/ipfs"
            }/${onephygital?.image?.slice(7)}`} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@MyriadFlow" />
			<meta name="twitter:title" content="Discover | MyriadFlow" />
			<meta name="twitter:description" content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life." />
			<meta name="twitter:image" content={`${
              "https://nftstorage.link/ipfs"
            }/${onephygital?.image?.slice(7)}`} />
		</Head>
    <Header1/>
    <ToastContainer />
      <div className="flex gap-10 mt-24 px-10">
        <div className="w-1/3">
          <img
            src={`${
              "https://nftstorage.link/ipfs"
            }/${onephygital?.image?.slice(7)}`}
            style={{ width: "70vh", height: "70vh" }}
          />
        </div>
        <div
          style={{
            border: "1px solid #0000004D",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingTop: "50px",
            width: "120vh",
            height: "70vh",
          }}
          className="w-2/3"
        >
          <div className="text-4xl font-bold">{onephygital?.name}</div>
          <div className="text-lg mt-10 font-bold">Base Network</div>
          <div className="mt-6">Owned by {onephygital?.deployer_address}</div>
          <div className="mt-4" >
            
            <div>Created by <span className="font-bold" style={{cursor:'pointer', position: 'relative'}}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                >{onephygital?.brand_name}
          {isHovered && (
            <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: 'absolute',
              top: '10%', // Adjust position based on your design
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
            <div style={{display: 'flex', gap:'20px'}}>
                <img 
                src={`${"https://nftstorage.link/ipfs"}/${logos?.slice(7)}`}
            
            style={{width: '80px', borderRadius:'100px'}}/>
              <div className="font-bold mt-6">{onephygital?.brand_name}</div>
              </div>
              <div className="mt-4" style={{fontSize: '13px', marginBottom:'20px'}}>{brandDesc}</div>
              <Link href={`/brand/${brandid}`} style={{fontSize: '15px', border:'1px solid white', borderRadius:'30px', padding:'4px'}}>View brand page</Link>
            </div>
          )}
                    </span>
            </div>

          </div>



          {/* --------------------------------------- user perspective --------------------------------------------------------- */}

          { !onephygital?.product_url ? (
            <>
            <div className="mt-10 text-2xl font-bold">Price Amount</div>
          <div
            className="mt-10"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div className="text-2xl font-bold">{onephygital?.price} ETH</div>
            <div>{priceUSD} USD</div>
            <div>Phygital & Unique avatar </div>
          </div>

          <div
                    className="text-lg mt-4"
                    style={{
                      color: "#DF1FDD",
                      height: "30px",
                    }}
                  >
                    {sold}/{onephygital?.quantity} Sold
                  </div>

          <div className="mt-0" style={{ display: "flex", gap: "20px" }}>
            <button
              className="w-1/2 justify-center flex"
              style={{
                backgroundColor: "#30D8FF",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
              onClick={buyasset}
            >
              BUY NOW
            </button>
            <button
             className="w-1/2"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "50px",
                paddingRight: "50px",
                border: "2px solid black",
              }}
              onClick={handleShare}
            >
              SHARE
            </button>
            <button
             className="w-1/2 flex items-center justify-center"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "2px solid black",
                
              }}
              onClick={handleAddToCart}
            >
              MOVE TO CART
               <span><img src="/cart.png" className="h-8 w-8 ml-4"/></span>
            </button>
          </div>
          </>)
          :(

<>
          <div style={{ display: "flex", justifyContent:'end' , marginTop:'100px', gap:'20px'}}>
            <div 
          className="w-1/2"
          >
            </div>
          <button
             className="w-1/2"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "70px",
                paddingRight: "70px",
                border: "2px solid black",
              }}
            >
              SHARE
            </button>
          </div>

          <div className="mt-10" style={{ display: "flex", gap: "20px" }}>
            <button
              className="w-1/2"
              style={{
                backgroundColor: "#30D8FF",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "70px",
                paddingRight: "70px",
                position:'relative'
              }}
              onClick={handleClaimClick}
            >
              CLAIM NOW
              {showPopover && (
          <div className="w-full"
            style={{
              position: 'absolute',
              bottom: '80px', // Adjust based on button height
              // left: '50%',
              transform: 'translateX(-15%)',
              color: 'black',
              padding: '10px 10px',
              borderRadius: '10px',
              zIndex: 1,
              border: '1px solid black'
            }}
          >
            To claim this phygital, scan the NFC tag on your product
          </div>
        )}
            </button>
            <Link href={`${onephygital?.product_url}`} target="_blank"
             className="w-1/2"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "70px",
                paddingRight: "70px",
                border: "2px solid black",
                display: 'flex',
                justifyContent: "center",
                gap:'4px'
              }}
            >
              <div>VIEW ON SHOPIFY</div>
              <img style={{width:'30px', marginTop:'-4px'}} src="/shopify.png"/>
            </Link>
          </div>
          </>
          )}


        </div>
      </div>

      <div className="flex gap-10 mt-4 px-10" style={{ marginBottom: "30px" }}>
        <div className="w-1/3" style={{ width: "70vh" }}>
          <div
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "30px",
              paddingBottom: "60px",
            }}
          >
            <div className="text-4xl font-bold">Description</div>
            <div className="mt-10">
              {onephygital?.description}
            </div>
          </div>
          <div
            className="mt-4"
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <div className="text-2xl font-bold">NFT Details </div>
            <div
              style={{ justifyContent: "space-between", display: "flex" }}
              className="mt-10"
            >
              <div>Contract Address</div>
              <div>{onephygital?.contract_address}</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Token ID</div>
              <div>Token ID</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Token Standard</div>
              <div>ERC-721A</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Chain</div>
              <div>Base Network</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Date Created</div>
              <div>{formatDate(onephygital?.created_at)}</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Last Sale</div>
              <div>sale date</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Last Updated</div>
              <div>{formatDate(onephygital?.updated_at)}</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Creator Earnings</div>
              <div>{onephygital?.royality} %</div>
            </div>
          </div>
        </div>

        <div className="w-2/3" style={{ width: "120vh" }}>
          <div
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "30px",
              paddingBottom: "60px",
            }}
          >
            <div className="text-4xl font-bold">WebXR</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="w-1/2">
                <Link href={`https://webxr.myriadflow.com/${onephygital?.id}`} target="_blank"
                  className="rounded"
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
                    color: "black", // Adjust text color to match your design
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    width: "250px",
                    height: "50px", // Set fixed width for the button
                    display: "block",
                    marginTop: "40px", // Center the button
                    display: "flex", // Use Flexbox
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                  }}
                >
                  Experience
                </Link>
                <div className="mt-10">
                  Access the WebXR experience to ask questions about the brand,
                  the product, and more!{" "}
                </div>
              </div>
              <div style={{margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  <div style={{textAlign: 'center', fontSize:'25px'}}>Avatar</div>
  {avatarUrl && (
    <div style={{ width: '200px' }}>
      <Avatar
        modelSrc={avatarUrl}
        cameraInitialDistance={1.2}
      />
    </div>
  )}
</div>
            </div>
          </div>
          <div
            className="mt-4"
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <div className="text-2xl font-bold">Additional Product details</div>
            <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 4px',
              borderRight:  activeTab === tab ? '1px solid black': '',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ paddingTop: '10px', borderTop: '1px solid black'}}>
        {activeTab === 'Color' && <p>{onephygital?.color}</p>}
        {activeTab === 'Size' && <p>{onephygital?.size}</p>}
        {activeTab === 'Weight' && <p>{onephygital?.weight}</p>}
        {activeTab === 'Material' && <p>{onephygital?.material}</p>}
        {activeTab === 'Usage' && <p>{onephygital?.usage}</p>}
        {activeTab === 'Unique Qualities' && <p>{onephygital?.quality}</p>}
        {activeTab === 'Manufacturer' && <p>{onephygital?.manufacturer}</p>}
        {activeTab === 'Made In' && <p>{onephygital?.origin_country}</p>}
      </div>

      
          </div>
        </div>
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
    </div>
  );
};

export default NFTPage;
