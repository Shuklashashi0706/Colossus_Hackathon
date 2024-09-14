"use client"
import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import Moralis from 'moralis';
import ProfileNftCard from '../../components/profileNftCard';
import Header1 from '../../components/header1';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function HomePage() {
  const { address } = useAccount();
  const chainId = useChainId();
  const router = useRouter();

  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [matchedNFTs, setMatchedNFTs] = useState([]);
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [x, setX] = useState('');
  const [instagram, setInstagram] = useState('');
  const [activeSection, setActiveSection] = useState('assets');
  const [showForm, setShowForm] = useState(false);

  const apikey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

  const handleVerify = () => {

    setShowForm(true)
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        await Moralis.start({ apiKey: apikey });

        const assets = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: chainId,
          format: 'decimal',
          mediaItems: false,
          address: address
        });

        setMintedNFTs(assets.raw.result);
        console.log("NFTs:", assets.raw.result);
      } catch (e) {
        console.error(e);
      }
    };

    if (address && chainId) {
      fetchNFTs();
    }
  }, [address, chainId, apikey]);

  useEffect(() => {
    const getUserData = async () => {
      if (address) {
        try {
          const response = await fetch(`${baseUri}/profiles/wallet/${address}`, {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data.name);
            setName(data.name);
            setCoverImage(data.cover_image);
            setProfileImage(data.profile_image);
            setBio(data.bio);
            setWebsite(data.website);
            setX(data.x);
            setInstagram(data.instagram);
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
    getUserData();
  }, [address]);

  useEffect(() => {
    const fetchPhygitals = async () => {
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
        console.log("Phygitals:", phyresult);

        const matched = phyresult.map(phygital => {
          const amountBought = mintedNFTs.reduce((count, nft) => {
            // console.log(`Comparing ${nft?.token_address} with ${phygital.contract_address}`);
            return count + (nft?.token_address === phygital.contract_address ? 1 : 0);
          }, 0);
          

          return {
            ...phygital,
            amount_bought: amountBought
          };
        }).filter(phygital => phygital.amount_bought > 0);

        setMatchedNFTs(matched);
        console.log("Matched NFTs:", matched);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (mintedNFTs.length > 0) {
      fetchPhygitals();
    }
  }, [mintedNFTs, baseUri]);

  return (
    <>
      <Header1 />

      <div
        style={{
          position: 'relative',
          height: '350px',
          backgroundColor: coverImage ? 'transparent' : '#D1D5DB',
          backgroundImage: coverImage ? `url(${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${coverImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '100px',
          borderRadius: '8px'
        }}
      >

        <div
          style={{
            position: 'absolute',
            left: '15%',
            transform: 'translateX(-50%)',
            bottom: '-46px',
          }}
        >
          <img
            src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"}
            alt="Profile"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '4px solid white',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col p-6" style={{ marginLeft: '2.5rem' }}>
        <div className="flex mt-10">
          <h1 className="text-4xl">{name || 'Your Name'}</h1>
          <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Owner</h1>
          {instagram || x ? (
            <>
              <img src='/verified.png' style={{ marginLeft: '2.5rem', height: '40px', width: '40px' }} />
              <button className="text-2xl mt-2 ml-2">Verified</button>
            </>
          ) : (
            <>
              <img src='/verified.png' style={{ marginLeft: '2.5rem', height: '40px', width: '40px' }} />
              <button className="text-2xl mt-2 ml-2" onClick={handleVerify}>Get Verified</button>
              {showForm && (
                <div
                  className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center"
                  style={{
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    WebkitBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    MozBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div className="flex flex-col bg-white rounded-lg p-8 max-w-md w-full text-center">
                    <h2
                      className="text-3xl mb-4"
                      style={{
                        background: 'linear-gradient(90deg, #30D8FF 0%, #5B0292 100%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontFamily: 'Bai Jamjuree, sans-serif'
                      }}
                    >
                      Hold on!
                    </h2>
                    <h2
                      style={{
                        fontFamily: 'Bai Jamjuree, sans-serif',
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: '27.5px',
                        textAlign: 'center',
                        color: 'black'
                      }}
                    >
                      To begin your verification process, you must link your X or Instagram account.
                    </h2>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        router.push('/profile-setting');
                      }}
                      className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black bg-sky-500"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black"
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
        <h1 style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#374151', fontWeight: '600' }}>Wallet Address : {address}</h1>

        <p className="text-gray-500 text-lg mt-6 ">{bio || "Short bio of the person here"}</p>

        <div className="flex mt-6">
          <Link
            href="/profile-setting"
            style={{
              backgroundColor: '#E6E6E6',
              color: 'black',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              textDecoration: 'none'
            }}
          >
            Edit Profile
          </Link>


          <button
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: '10px 40px',
              borderRadius: '8px',
              border: '4px solid #38bdf8',
              marginLeft: '1rem'
            }}
          >
            SHARE
          </button>
        </div>

        <div style={{ float: 'right', width: '300px', marginLeft: '1100px', marginTop: '-200px' }}>
          <div style={{ display: 'flex' }}>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <img src='/website.png' style={{ height: '30px', width: '30px' }} alt="Website" />
              </a>
            )}
            {x && (
              <a href={x} target="_blank" rel="noopener noreferrer">
                <img src='/x.png' style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="X" />
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <img src='/insta.png' style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Instagram" />
              </a>
            )}
          </div>

          <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '0.5rem', boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#FFFFFF' }}>
              <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }}>{'0 Followers'}</h1>
              <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }}>{'0 Following'}</h1>
              <h1 style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#374151', fontWeight: '600' }}>Address</h1>
              <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }} className='truncate-wallet'>{address}</h1>
            </div>
          </div>
        </div>

        <div className="flex mt-10 text-gray-700">
          <button
            id='myassets'
            className={`text-lg hover:text-black hover:underline ${activeSection === 'assets' ? 'text-black underline' : ''}`}
            style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
            onClick={() => setActiveSection('assets')}
          >
            My assets
          </button>
          <button
            id='onsale'
            className={`text-lg hover:text-black hover:underline ${activeSection === 'sale' ? 'text-black underline' : ''}`}
            style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
            onClick={() => setActiveSection('sale')}
          >
            On Sale
          </button>
          <button
            id='mybrands'
            className={`text-lg hover:text-black hover:underline ${activeSection === 'brands' ? 'text-black underline' : ''}`}
            style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
            onClick={() => setActiveSection('brands')}
          >
            My Brands
          </button>
          <button
            id='mycollections'
            className={`text-lg hover:text-black hover:underline ${activeSection === 'collections' ? 'text-black underline' : ''}`}
            style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
            onClick={() => setActiveSection('collections')}
          >
            My collections
          </button>
          <button
            id='activity'
            className={`text-lg hover:text-black hover:underline ${activeSection === 'activity' ? 'text-black underline' : ''}`}
            style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
            onClick={() => setActiveSection('activity')}
          >
            Activity
          </button>
          <button
            id='rewards'
            className={`text-lg hover:text-black hover:underline ${activeSection === 'rewards' ? 'text-black underline' : ''}`}
            style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
            onClick={() => setActiveSection('rewards')}
          >
            Rewards
          </button>
          <a
            href="https://studio.myriadflow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-black hover:underline"
            style={{ fontSize: '1.25rem' }}
          >
            Create
          </a>
        </div>

        <div style={{ padding: '50px' }}>
          {activeSection === 'assets' && (
            <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
              {matchedNFTs?.map((nft, index) => (
                <ProfileNftCard key={index} nft={nft} />
              ))}
            </div>
          )}

          {activeSection !== 'assets' && activeSection !== 'create' && (
            <div className='mt-10 text-center text-2xl text-gray-600'>
              Coming Soon
            </div>
          )}
        </div>
      </div>

      <div className='pt-20'>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
