"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button, Navbar } from '@/components'

interface Collection {
    id: string; 
    logo_image: string;
    name: string;
    description: string;
  }
const NFTPage = ({ params}: any) => {
    const id = params?.id;
    const [collections, setCollections] = useState<Collection[]>([]);


    const apiUrl = process.env.NEXT_PUBLIC_URI;


    const getCollection = async () => {

        const response = await fetch(`${apiUrl}/collections/brand-id/${id}`)

        const result: Collection[] = await response.json();
        console.log(result);
        setCollections(result)
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        <div>
            <div >
                <Navbar />
                <h1 className="text-5xl text-center mt-10">Your Collections</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                    {collections?.map((collection) => (
                        <a key={collection.id} href={`/nfts/${collection.id}`}>
                            <div className='shadow-lg rounded-lg p-6'>
                                <img
                                    src={`https://nftstorage.link/${collection.logo_image.replace('ipfs://', 'ipfs/')}`}
                                    alt={collection.name}
                                    className='mb-4'
                                />
                                <h3 className='text-xl font-bold'>{collection.name}</h3>
                                <p className='text-gray-700'>{collection.description}</p>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default NFTPage;
