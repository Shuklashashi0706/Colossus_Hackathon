"use client";
import React, { useEffect, useState } from "react";
import Header1 from '../../components/header1';
import { useAccount } from "wagmi";
import 'react-toastify/dist/ReactToastify.css';

function User() {
    const { address } = useAccount();
    const [users, setUsers] = useState([]);
    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

    useEffect(() => {
        const getUserData = async () => {
            if (address) {
                try {
                    const response = await fetch(`${baseUri}/profiles/all/554b4903-9a06-4031-98f4-48276c427f78`, {
                        method: 'GET',
                        headers: {
                            'content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsers(data);
                    } else {
                        console.log('No users found');
                    }
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
        };
        getUserData();
    }, [address]);

    return (
        <div>
            <Header1 />
            <div className="mx-4 lg:mx-20 mt-16 lg:mt-32">
                <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">All Users</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {users.map((user, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <div className="relative">
                                {user.cover_image ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${user.cover_image}`}
                                        alt="Cover"
                                        className="w-full h-24 object-cover rounded-t-lg"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-24 rounded-t-lg"
                                        style={{ backgroundColor: '#D1D5DB' }}
                                    ></div>
                                )}
                                <img
                                    src={user.profile_image ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${user.profile_image}` : "/profile.png"}
                                    alt="Profile"
                                    className="w-12 h-12 object-cover rounded-full absolute top-16 left-4 border-2 border-white"
                                />
                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold">{user.name || "Display Name"}</h2>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500">Visitor</p>
                                        <img src="/verified.png" className="h-6 w-6" alt="Verified" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">X Followers</p>
                                    <button className="mt-2 bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-full flex items-center">
                                        <span className="mr-2">+</span>Follow
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User;
