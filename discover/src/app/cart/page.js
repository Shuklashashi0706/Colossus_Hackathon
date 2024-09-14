"use client";
import { React, useEffect, useState } from "react";
import Header1 from '../../components/header1';
import { useAccount } from "wagmi";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const { address } = useAccount();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';


    const getCartItems = async () => {
        const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

        try {
            const response = await fetch(`${baseUri}/cart/${address}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const cartItems = await response.json();
            setCartItems(cartItems);
        } catch (error) {
            toast.error('Failed to fetch cart items.');
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (address) {
            getCartItems();
        }
    }, [address]);

    return (
        <div>
            <Header1 />
            <div className="mx-20 mt-32">

                <h1 className="text-3xl font-bold mb-10">My Shopping Cart</h1>
                <div className="flex gap-8">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.phygital_id} style={{
                                position: "relative",
                                display: "inline-block",
                                width: "330px",
                                borderRadius: "30px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                                overflow: "hidden",
                                cursor: "pointer",
                                padding: "20px",
                                border: "1px solid #ddd"
                            }}>
                                {/* Main Link for NFT */}
                                <div style={{ position: 'relative' }}>
                                    <Link href={`/nfts/${item.phygital_id}`}>
                                        <img
                                            src={`https://nftstorage.link/ipfs/${item.image.slice(7)}`}
                                            className="rounded"
                                            style={{ width: "100%", height: "auto", borderRadius: '30px' }}
                                            alt={item.name}
                                        />
                                        <div className="flex flex-col mt-4">
                                            <div className="font-bold text-lg">{item.name}</div>
                                            <div className="text-lg text-gray-600">{item.price} ETH</div>
                                        </div>
                                    </Link>
                                    <div className="flex justify-between mt-4">
                                        <p className="text-lg text-black">{item.quantity} in Cart</p>
                                        <Link href={`/nfts/${item.phygital_id}`}>
                                            <button className="px-6 py-4 text-lg" style={{
                                                backgroundColor: "#DF1FDD36",
                                                border: "1px solid black",
                                                height: "30px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "5px",

                                            }}>
                                                Buy
                                            </button>
                                        </Link>
                                        <button
                                            className="px-4  bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={async () => {
                                                try {
                                                    await fetch(`${baseUri}/cart/${address}/${item.phygital_id}`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        }
                                                    });
                                                    setCartItems(cartItems.filter(cartItem => cartItem.phygital_id !== item.phygital_id));
                                                    toast.success('Item removed from cart.');
                                                } catch (error) {
                                                    toast.error('Failed to remove item from cart.');
                                                    console.error('Error removing item:', error);
                                                }
                                            }}
                                        >
                                            Remove
                                        </button>

                                    </div>
                                </div>


                                {/* Brand Logo and Hover Effect */}
                                <img
                                    src={`https://nftstorage.link/ipfs/${item.logo?.slice(7)}`}
                                    alt="Brand Logo"
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        left: "10px",
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: '50%',
                                        zIndex: 1
                                    }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                />

                                {/* Web XR Link */}
                                <Link href={`https://webxr.myriadflow.com/${item.phygital_id}`} target="_blank"
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
                        ))
                    ) : (
                        <p className="flex justify-center items-center mt-32 text-3xl mx-[40%]">Your cart is empty.</p>
                    )}
                </div>
            </div>


            <ToastContainer />
        </div>
    );
}

export default Cart;
