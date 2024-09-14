'use client'
import { useState, useEffect } from 'react'
import { Button, Navbar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { toast, ToastContainer } from 'react-toastify'
import Footer from '@/components/footer'
import { v4 as uuidv4 } from 'uuid';

interface Brand {
  id: string; // UUID type
  logo_image: string;
  name: string;
  description: string;
}

export default function Home() {
  const { address: walletAddress } = useAccount()
  const [hasAddress, setHasAddress] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const account = useAccount()
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [tosChecked, setTosChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_URI;
  const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';


  useEffect(() => {
    const checkEmailExists = async () => {
      if (account?.address) {
        try {
          const response = await fetch(`${baseUri}/profiles/email/${account.address}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data.email);

            // If the email exists, set showForm to false
            if (data.email) {
              setShowForm(false);
            } else {
              setShowForm(true);
            }
          } else {
            // Handle errors or cases where no data is returned
            setShowForm(true);
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
          setShowForm(true);
        }
      }
    };

    checkEmailExists();
  }, [account.address]);


  const handleSubmit = async () => {
    if (displayName && email && tosChecked) {
      try {
        const profileId = uuidv4();
        const response = await fetch(`${baseUri}/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: profileId,
            name: displayName,
            email: email,
            wallet_address: account.address,
            chaintype_id: '554b4903-9a06-4031-98f4-48276c427f78'
          }),
        });

        if (response.ok) {
          setShowForm(false);
        } else {
          console.error('Failed to submit profile data');
        }
      } catch (error) {
        console.error('Error submitting profile data:', error);
      }
    }
  };
  const getBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands/manager/${walletAddress}`)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const result: Brand[] = await res.json();
      setBrands(result);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  }

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
      localStorage.setItem("BaseSepoliaChain", "554b4903-9a06-4031-98f4-48276c427f78")
      setHasAddress(true);
      getBrands();
    } else {
      setHasAddress(false);
    }
  }, [walletAddress]);

  const ifConnected = async () => {
    if (!walletAddress) {
      toast.warning('Connect your wallet');
    }
  }

  return (
    <>
      <Navbar />
      <main className='flex-col flex text-black text-center gap-12 justify-center relative'>
        <ToastContainer />
        {/* <Image
          src='/images/blob-3.png'
          alt='blob'
          height={350}
          width={350}
          className='absolute top-0 right-0'
        /> */}
        {hasAddress ? (
          <div className='p-8'>
            {/* <div className='absolute top-0 right-0 mt-10 mr-8'>
              <Link href='/create-brand'>
                <Button className='bg-[#30D8FF] rounded-full hover:text-white text-black'>
                  Create Brand
                </Button>
              </Link>
            </div> */}
            {brands.length == 0 && (
              <div className='flex-col flex text-black text-center gap-12 justify-center relative mt-32'>
                <h1 className='text-6xl font-bold mb-6 uppercase'>
                  MetaEngage studio
                </h1>
                <h2 className='text-3xl '>
                  <span className='inline-block'>
                    Welcome to MetaEngage Studio, your one-stop shop for creating groundbreaking phygital NFTs!</span>
                </h2>
                <div className='flex flex-col gap-14 justify-center items-center text-xl'>
                  <p>
                    You have not created any brands yet. Ready to start your journey?
                  </p>
                  <Link href='/create-brand'>
                    <Button className='bg-[#30D8FF] rounded-full hover:text-white text-black'>
                      Create Brand
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            {showForm && (
              <div
                className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center"
                style={{
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  WebkitBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  MozBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
              >
                <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
                  <h2
                    className="text-3xl mb-4"
                    style={{
                      background: 'linear-gradient(90deg, #30D8FF 0%, #5B0292 100%)',
                      backgroundClip: 'text',
                      color: 'transparent',
                      fontFamily: 'Bai Jamjuree, sans-serif'
                    }}
                  >
                    You&apos;re almost ready!
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
                    Choose a public display name and share your email address to sign up with MyriadFlow.
                  </h2>

                  <input
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-2 mb-2 rounded-lg border border-gray-300 mt-4"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-2 rounded-md border border-gray-300"
                    required
                  />
                  <div className="mb-4 flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="tos"
                      checked={tosChecked}
                      onChange={(e) => setTosChecked(e.target.checked)}
                      className="mr-2 -mt-4"
                      required
                    />
                    <label htmlFor="tos" className="text-sm">
                      I have read and accept the{' '}
                      <a href="#" className="text-blue-500">
                        Terms of Service
                      </a>{' '}
                      and confirm that I am at least 18 years old.
                    </label>
                  </div>
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={newsletterChecked}
                      onChange={(e) => setNewsletterChecked(e.target.checked)}
                      className="mr-2 -mt-4"
                    />
                    <label htmlFor="newsletter" className="text-sm">
                      I want to stay up-to-date and receive announcements and news from MyriadFlow.
                    </label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className={`w-full py-2 rounded-md text-black ${tosChecked && displayName && email
                      ? 'bg-[#30D8FF]'
                      : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    disabled={!tosChecked || !displayName || !email}
                  >
                    Finish Sign-Up
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
              {brands.map((brand) => (
                // <a key={brand.id} href={`/nfts/${brand.id}`}>
                <div className='shadow-lg rounded-lg p-6' key={brand.id}>
                  <img
                    src={`https://nftstorage.link/${brand.logo_image.replace('ipfs://', 'ipfs/')}`}
                    alt={brand.name}
                    className='mb-4'
                  />
                  <h3 className='text-xl font-bold'>{brand.name}</h3>
                  <p className='text-gray-700'>{brand.description}</p>
                </div>
                // </a>
              ))}
            </div>
          </div>
        ) : (
          <div className='h-screen flex-col flex text-black text-center gap-12 justify-center relative -mt-14'>
            <h1 className='text-6xl font-bold mb-6 uppercase'>
              MetaEngage studio
            </h1>
            <h2 className='text-2xl '>
              <span className='inline-block'>
                Welcome to MetaEngage Studio, your one-stop shop for creating groundbreaking phygital NFTs!</span>
            </h2>
            <div className='flex flex-col gap-14 justify-center items-center'>
              <p>
                You have not created any brands yet. Ready to start your journey?
              </p>
              <button className='bg-[#30D8FF] rounded-full text-black p-4' onClick={ifConnected}>
                Start Your Journey
              </button>
            </div>
          </div>
        )}
        {/* <Image
          src='/images/blob-2.png'
          alt='blob'
          height={350}
          width={350}
          className='absolute bottom-18 left-0'
        />
        <Image
          src='/images/blob-1.png'
          alt='blob'
          height={350}
          width={350}
          className='absolute bottom-0 left-0'
        /> */}
        <Footer />
      </main>
    </>
  )
}
