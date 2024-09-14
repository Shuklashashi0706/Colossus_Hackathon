"use client"
import React , {useEffect, useState} from 'react';
import Link from 'next/link';

const MostLovedCard = ({nft, fantokensCount}) => {

  const [logo , setLogos] = useState("");
  const [lowestPrice, setlowestPrice] = useState("");
  const [lowestPriceUSD, setLowestPriceUSD] = useState("");
  const [productURL, setProductURL] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [desc, setdesc] = useState("");
  const [brandid, setbrandid] = useState("");
  const [phygitals, setPhygitals] = useState([]);

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

  const collres = await fetch(`${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`, {
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

  if (!res.ok || !collres.ok || !phyres.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  const collresult = await collres.json();
  const phygitals = await phyres.json();

  const matchingColl = collresult.find(col => col.id === nft?.id);

  
  if (matchingColl) {
    // Find the corresponding brand in result
    const matchedBrand = result.find(brand => brand.id === matchingColl.brand_id);
    if (matchedBrand) {
      setLogos(matchedBrand.logo_image);
      setdesc(matchedBrand.description);
      setbrandid(matchedBrand.id);
    }
  }

  const matchedCollections = phygitals.filter(phygitals => phygitals.collection_id === nft?.id);

  setPhygitals(matchedCollections);

  // console.log("logo", logo, result, collresult);

} catch (error) {
  console.error('Error fetching data:', error);
}
   }

   brandmatch();
  }, [])


  useEffect(() => {
    const startingPrice = async() => {

      const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

try {

  const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!phyres.ok) {
    throw new Error('Failed to fetch data');
  }

  const phyresult = await phyres.json();

 // Filter the data to find items with collection_id "236984"
 const filteredData = phyresult.filter(item => item.collection_id === nft?.id);

 if (filteredData.length === 0) {
   console.log("No items found with collection_id 236984");
   return;
 }

 // Extract the prices from the filtered data
 const prices = filteredData.map(item => item.price);

 // Find the lowest price
 const lowestPrice = Math.min(...prices);

 console.log("The lowest price is:", lowestPrice, filteredData, prices);
 setlowestPrice(lowestPrice);


  // Fetch the current ETH to USD conversion rate
  const conversionRateRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    
  if (!conversionRateRes.ok) {
    throw new Error('Failed to fetch ETH to USD conversion rate');
  }
  
  const conversionRateResult = await conversionRateRes.json();
  const ethToUsdRate = conversionRateResult.ethereum.usd;
  
  console.log("Current ETH to USD rate:", ethToUsdRate);
 
  // Convert the lowest price from ETH to USD
  const lowestPriceInUSD = lowestPrice * ethToUsdRate;
  console.log("The lowest price in USD is:", lowestPriceInUSD.toFixed(2));
  setLowestPriceUSD(lowestPriceInUSD.toFixed(2));

  const productURL = filteredData[0].product_url;
  setProductURL(productURL);

} catch (error) {
  console.error('Error fetching data:', error);
}
    }

    startingPrice();
  }, [])
  


  return (
    <div style={{ position: "relative", display: "inline-block" }}>
    <Link href={`/collection/${nft.id}`}>
        <div
        style={{
          width: "330px",
          borderRadius: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={`${
              "https://nftstorage.link/ipfs"
            }/${nft?.logo_image.slice(7)}`}
            className="rounded"
            style={{ padding: "20px", borderRadius: '30px' }}
          />
          {/* New Image and Text at the top ends */}
          <img
            src={`${
              "https://nftstorage.link/ipfs"
            }/${logo?.slice(7)}`}
            alt="New Icon"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "50px",
              height: "50px",
              borderRadius:'50px'
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px 20px",
              borderRadius: "10px",
              border: '1px solid black',
              background:'white'
            }}
          >
            Web XR
          </div>
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
          { productURL ? (
            <div
            className="text-lg"
            style={{
              border: "1px solid black",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              gap:'4px',
              paddingLeft:'25px',
              paddingRight:'25px',
              marginBottom:'25px'
            }}
          >
            <div>View</div>
            <img style={{width:'25px'}} src="/shopify.png"/>
          </div>
          ) 
          :
          (
          <div>
            <div className="text-xl">Starts from {lowestPrice} ETH {fantokensCount > 0 && `- ${0.01 * fantokensCount} (tokens)`}</div>
            <div>{lowestPriceUSD} USD</div>
          </div>)}
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
            Buy
          </div>
        </div>
      </div>
     </Link>

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
                  zIndex: 1 // Ensure it's on top of the card
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
                src={`${"https://nftstorage.link/ipfs"}/${logo?.slice(7)}`}
            
            style={{width: '80px', borderRadius:'100px'}}/>
              {/* <div className="font-bold mt-6">{onephygital?.brand_name}</div> */}
              </div>
              <div className="mt-4" style={{fontSize: '13px', marginBottom:'20px'}}>{desc}</div>

              <Link href={`/brand/${brandid}`} style={{fontSize: '15px', border:'1px solid white', borderRadius:'30px', padding:'4px'}}>View brand page</Link>
            </div>
          )}

<Link href={`https://webxr.myriadflow.com/${phygitals[0]?.id}`} target="_blank"
style={{
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "5px 20px",
  borderRadius: "10px",
  border: '1px solid black',
  background: 'white',
  zIndex: 1 // Ensure it's on top of the card
}}
>
Web XR
</Link>
</div>
  )
}

export default MostLovedCard;