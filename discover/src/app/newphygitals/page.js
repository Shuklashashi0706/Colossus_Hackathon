'use client'
import React, { useState, useEffect } from 'react'
import HotNftCard from '../../components/hotNftCard'
import Header1 from '../../components/header1'
import Footer from '../../components/footer'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const LatestNFTs = () => {

  const [loading, setLoading] = useState(false)
  const [phygitals, setPhygitals] = useState([]);

  const getBrands = async () => {
    try {
        setLoading(true);

      const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

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
  
      setPhygitals(phyresult);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

useEffect(() => {
    getBrands()
}, [])

	return (
        <>
        <div
				className=''
				style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
			>
				<Header1 />
			</div>
		<div style={{paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px', paddingTop: '100px'}}>
			<div className='font-bold text-black text-6xl mt-10'>New on Discover</div>
			<div
				className='flex justify-between text-2xl'
				style={{ justifyContent: 'space-between' }}
			>
				<div className='mt-4'>
                New Frontier: Be Among the First to Discover the Newest Phygitals Making Their Debut!
				</div>
			</div>

			<div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
			{phygitals
  ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .map((nft, index) => (
    <HotNftCard key={index} nft={nft} />
  ))}
      </div>

		</div>
        <div className='bg-white'>
				<Footer />
			</div>
        </>
	)
}

export default LatestNFTs;
