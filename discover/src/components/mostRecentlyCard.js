"use client"
import React , {useEffect, useState} from 'react';

const MostRecentlyCard = ({ nft }) => {

  const [logo , setLogos] = useState("")
  const [lowestPrice, setlowestPrice] = useState("");
  const [lowestPriceUSD, setLowestPriceUSD] = useState("");

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

  if (!res.ok || !collres.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  const collresult = await collres.json();

  const matchingColl = collresult.find(col => col.id === nft?.id);

  
  if (matchingColl) {
    // Find the corresponding brand in result
    const matchedBrand = result.find(brand => brand.id === matchingColl.brand_id);
    if (matchedBrand) {
      setLogos(matchedBrand.logo_image);
    }
  }

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

} catch (error) {
  console.error('Error fetching data:', error);
}
    }

    startingPrice();
  }, [])


  return (
    <div>
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
              }/${nft?.cover_image.slice(7)}`}
            className="rounded"
            style={{ padding: "20px", borderRadius: '30px' }}
            alt="Gold Headphones"
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
          className="flex justify-between"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div className="text-xl">Starts from {lowestPrice} ETH</div>
            <div>{lowestPriceUSD} USD</div>
          </div>
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
    </div>
  );
}

export default MostRecentlyCard;
