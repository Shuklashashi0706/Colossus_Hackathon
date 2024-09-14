"use client"
import React, {useState, useEffect} from "react";
import Link from "next/link";

const ConfirmAddr = ({ params }) => {
  const id = params?.id;

  const [isHovered, setIsHovered] = useState(false);
  const [confirmClicked, setconfirmClicked] = useState(false);

  const [onephygital, setonePhygital] = useState([]);
  const [loading, setLoading] = useState(false);

	const getBrands = async () => {

    setLoading(true);

		// const phyres = await fetch(`${apiUrl}/api/phygitals/${id}`)

    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

		  const phyres = await fetch(`${baseUri}/phygitals/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			});

		const phyresult = await phyres.json()
		setonePhygital(phyresult);
    setLoading(false);
	}

	useEffect(() => {
		getBrands()
	}, [])

  return (
    <div>
      <div className="px-10" style={{display:'flex', justifyContent: 'space-between', background: 'linear-gradient(90deg, #DF1FDD8A, #30D8FFAB, #5347E7AB)', paddingBottom: '10px'}}>
        <div
          className='mt-4'
        >
          <a href="/">
          <img src="../logo2.png" style={{ width: '200px' }} alt="Logo" />
          </a>
        </div>
        <div style={{display:'flex', gap:'40px', fontSize:'20px', color:'white'}} className="font-bold mt-6">
        <Link href="https://myriadflow.com" target="_blank">Home</Link>
<Link href="/#movetotrends">Explore</Link>
<Link href="/collections">Collections</Link>
<Link href="/brands">Brands</Link>
<Link href="/profile">Dashboard</Link>
        </div>
        <div className="mt-6">
            {/* <button className="px-10 mt-6" style={{color: "white", paddingTop:'5px', paddingBottom:'5px', borderRadius:'50px', backgroundImage: 'url("../Rectangle 12.png")'}}>Connect</button> */}
            <w3m-button />
        </div>
    </div>
      <div className="mt-10 px-10">
        
        <div
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingTop: "20px",
          }}
          className=""
        >
          <div className="text-6xl font-bold" 
          style={{backgroundImage: "linear-gradient(90deg, #30D8FF, #5B0292, #5B0292, #5B0292)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          paddingBottom: "10px"}}>Congratulations!</div>
          <div className="text-2xl mt-10">You have successfully minted {onephygital?.name} phygital NFT!</div>



          {/* --------------------------------------- user perspective --------------------------------------------------------- */}

          <div className="mt-10 text-2xl font-bold">IMPORTANT!</div>

          <div className="mt-10" style={{fontSize:'20px'}}>Fill in your address, so {onephygital?.brand_name} can ship your product.</div>
          <div
            className="mt-10"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div style={{ fontSize:'22px', fontWeight:'bold' }}>Shipping address:</div>
          </div>

          <div
            className="mt-4"
          >
            <input
      type="text"
      style={{
        backgroundColor: '#0000001A',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '40%', // Adjust as needed
        color: '#000', // Text color
        fontSize: '16px'
      }}
      placeholder="Your address"
    />
          </div>

          <div className="mt-10" style={{ display: "flex", gap: "20px" }}>
            <button
              className="justify-center flex"
              style={{
                backgroundColor: "#30D8FF",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "30px",
                paddingRight: "30px",
                borderRadius:'15px',
                fontSize: '20px'
              }}
              onClick={()=>{setconfirmClicked(true)}}
            >
              Confirm address
            </button>
          </div>


        </div>
      </div>


      { confirmClicked && (
  <div
    style={{
      backgroundColor: "#FFFFFFB2",
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
    <div
      style={{
        position: "relative",
        padding: "16px",
        width: "100%",
        maxWidth: "32rem",
        maxHeight: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "0.5rem",
          boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)",
          color: "white",
          background: "linear-gradient(to bottom right, #A25FF8 0%, #30D8FF 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "16px",
            borderRadius: "20px",
            borderColor: "#4B5563",
          }}
        >
          {/* Add any additional content or buttons here */}
        </div>

        <div style={{ padding: "16px", spaceY: "16px" }}>
          <p style={{ fontSize: "1.875rem", textAlign: "center", fontWeight: "bold"}}>
          Address confirmed
          </p>
          <p style={{ fontSize: "1.2rem", textAlign: "center", paddingTop: "40px" }}>
          Product is on the way!
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingTop: "20px", paddingBottom: "16px" }}>
          <a
            href="/"
            type="button"
            style={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              color: "black",
              fontWeight: "600",
              focusRing: "4px",
              outline: "none",
              borderRadius: "30rem",
              fontSize: "1rem",
              padding: "10px 20px",
              textAlign: "center",
              backgroundColor: 'white',
            }}
          >
            Go Back to Discover
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", paddingTop: "16px", paddingBottom: "80px" }}>
          <Link
            href="/profile"
            type="button"
            style={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              color: "white",
              fontWeight: "600",
              focusRing: "4px",
              outline: "none",
              borderRadius: "30rem",
              fontSize: "1rem",
              padding: "10px 20px",
              textAlign: "center",
              border:'1px solid white'
            }}
          >
            View my assets
          </Link>
        </div>
      </div>
    </div>
  </div>
)}



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

export default ConfirmAddr;
