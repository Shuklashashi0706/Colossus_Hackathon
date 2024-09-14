"use client";
import { Navbar } from '@/components';
import Footer from '@/components/footer';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

function ProfileSettingsPage() {
    const { address } = useAccount();

    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [x, setx] = useState('');
    const [instagram, setInstagram] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [isCoverHovered, setIsCoverHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [isCoverPopupVisible, setIsCoverPopupVisible] = useState(false);
    const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const [currentSection, setCurrentSection] = useState('profile');

    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

    const handleSave = async () => {
        const profileData = {
            name: displayName,
            username: userName,
            bio: bio,
            website: website,
            x: x,
            instagram: instagram,
            cover_image: coverImage,
            profile_image: profileImage
        };

        try {
            const response = await fetch(`${baseUri}/profiles/${address}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (response.ok) {
                console.log('Profile settings saved successfully!');
                setIsEditing(false);
            } else {
                console.error('Failed to save profile settings.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleFileUpload = async (type) => {
        if (!selectedFile) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.set('file', selectedFile);

        try {
            const response = await fetch("/api/files", {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                const ipfsHash = data.IpfsHash;
                if (type === 'cover') {
                    setCoverImage(ipfsHash);
                    setIsCoverPopupVisible(false);
                } else if (type === 'profile') {
                    setProfileImage(ipfsHash);
                    setIsProfilePopupVisible(false);
                }
                setIsEditing(true);  // Enable save button after upload
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEditClick = (type) => {
        if (type === 'cover') {
            setIsCoverPopupVisible(true);
        } else if (type === 'profile') {
            setIsProfilePopupVisible(true);
        }
    };

    const handleButtonClick = (section) => {
        setCurrentSection(section);
    };

    useEffect(() => {
        const getUserData = async () => {
            if (address) {
                try {
                    const response = await fetch(`${baseUri}/profiles/wallet/${address}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setDisplayName(data.name);
                        setUserName(data.username);
                        setCoverImage(data.cover_image);
                        setProfileImage(data.profile_image);
                        setBio(data.bio);
                        setWebsite(data.website);
                        setx(data.x);
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

    return (
        <>
            <div style={{ zIndex: 10, position: 'fixed', left: 0, right: 0, top: 0 }}>
                <Navbar/>
            </div>

            <h1 className='text-3xl' style={{ marginTop: '150px', marginLeft: '50px' }}>Profile Settings</h1>
            <div style={{ display: 'flex', padding: '40px' }}>
                {/* Sidebar */}
                <div style={{ flexDirection: 'column', maxWidth: '300px', marginRight: '30px' }}>
                    <button
                        style={{ padding: '15px', marginBottom: '10px', color: currentSection === 'profile' ? '#7D4AB5' : '#6B7280', fontWeight: '500', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => handleButtonClick('profile')}
                    >
                        Profile
                    </button> <br />
                    <button
                        style={{ padding: '15px', marginBottom: '10px', color: currentSection === 'account' ? '#7D4AB5' : '#6B7280', fontWeight: '500', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => handleButtonClick('account')}
                    >
                        Account
                    </button> <br />
                    <button
                        style={{ padding: '15px', marginBottom: '10px', color: currentSection === 'notifications' ? '#7D4AB5' : '#6B7280', fontWeight: '500', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => handleButtonClick('notifications')}
                    >
                        Notifications
                    </button>

                    <div style={{ backgroundColor: '#F3E9FE', borderRadius: '8px', padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '300px', marginTop: '30px' }}>
                        <img src="/verified.png" alt="Verified Icon" style={{ width: '50px', height: '50px', marginBottom: '20px' }} />
                        <div>
                            <p style={{ color: '#6B7280', marginBottom: '20px' }}>Click to proceed with the verification process to become a creator and gain the trust of the community!</p>
                            <button style={{ backgroundColor: '#7D4AB5', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => handleButtonClick('get verified')}>Get Verified!</button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 3, marginRight: '50px' }}>
                    {currentSection === 'profile' ? (
                        <>
                            {/* Cover image */}
                            <div
                                style={{
                                    height: '250px',
                                    backgroundColor: coverImage ? 'transparent' : '#D1D5DB',
                                    backgroundImage: coverImage ? `url(${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${coverImage})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => setIsCoverHovered(true)}
                                onMouseLeave={() => setIsCoverHovered(false)}
                                onClick={() => handleEditClick('cover')}
                            >
                                {isCoverHovered && (
                                    <button style={{ position: 'absolute', right: '20px', top: '20px', backgroundColor: '#4B5563', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                                        Edit Cover
                                    </button>
                                )}


                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '15%',
                                        transform: 'translateX(-50%)',
                                        bottom: '-46px',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={() => setIsProfileHovered(true)}
                                    onMouseLeave={() => setIsProfileHovered(false)}
                                    onClick={() => handleEditClick('profile')}
                                >
                                    <img
                                        src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"}
                                        alt="Profile"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            borderRadius: '50%',
                                            border: '4px solid white',
                                            objectFit: 'cover',
                                        }}
                                    />

                                    {isProfileHovered && (
                                        <button style={{ position: 'absolute', right: '40px', top: '110px', backgroundColor: '#4B5563', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginTop: '100px' }}>
                                <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>Display Name</label>
                                <input
                                    className='w-1/2'
                                    type='text'
                                    value={displayName}
                                    onChange={(e) => {
                                        setDisplayName(e.target.value);
                                        setIsEditing(true);
                                    }}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '50%', marginBottom: '20px' }}
                                />

                                <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>User Name</label>
                                <input
                                    className='w-1/2'
                                    type='text'
                                    placeholder='Enter your new username here'
                                    value={userName}
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                        setIsEditing(true);
                                    }}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '50%', marginBottom: '20px' }}
                                />

                                <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>Bio</label>
                                <textarea
                                    className='w-1/2'
                                    placeholder='A few words about yourself'
                                    value={bio}
                                    onChange={(e) => {
                                        setBio(e.target.value);
                                        setIsEditing(true);
                                    }}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '50%', marginBottom: '20px', minHeight: '100px' }}
                                />
                                <h1 style={{ display: 'block', fontWeight: '300', marginBottom: '10px', marginTop: '30px', fontSize: '32px' }}>
                                    Social Links
                                </h1>

                                <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>Website</label>
                                <input
                                    className='w-1/2'
                                    type='text'
                                    placeholder='https://'
                                    value={website}
                                    onChange={(e) => {
                                        setWebsite(e.target.value);
                                        setIsEditing(true);
                                    }}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '50%', marginBottom: '20px' }}
                                />

                                <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>Twitter</label>
                                <input
                                    className='w-1/2'
                                    type='text'
                                    placeholder='https://'
                                    value={x}
                                    onChange={(e) => {
                                        setx(e.target.value);
                                        setIsEditing(true);
                                    }}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '50%', marginBottom: '20px' }}
                                />

                                <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>Instagram</label>
                                <input
                                    className='w-1/2'
                                    type='text'
                                    placeholder='https://'
                                    value={instagram}
                                    onChange={(e) => {
                                        setInstagram(e.target.value);
                                        setIsEditing(true);
                                    }}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '50%', marginBottom: '20px' }}
                                />
                            </div>

                            {
                                isEditing ? (
                                    <button
                                        onClick={handleSave}
                                        style={{
                                            backgroundColor: '#7D4AB5',
                                            color: '#ffffff',
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            marginTop: '20px'
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        style={{
                                            backgroundColor: '#7D4AB5',
                                            color: '#ffffff',
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            marginTop: '20px'
                                        }}
                                    >
                                        Edit
                                    </button>
                                )
                            }

                            {isCoverPopupVisible && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1000,
                                    }}
                                >
                                    <div style={{
                                        backgroundColor: 'white',
                                        padding: '30px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'  // Ensures text is centered
                                    }}>
                                        <h2 style={{ marginBottom: '20px' }} className='text-3xl'>Upload Cover Image</h2>
                                        <h2
                                            style={{
                                                fontFamily: 'Bai Jamjuree, sans-serif',
                                                fontWeight: 300,
                                                fontSize: '15px',
                                                lineHeight: '27.5px',
                                                color: 'black'
                                            }}
                                        >
                                            Choose an image to display as your cover. <br /> Recommended size 1920 x  486px
                                        </h2>
                                        <input type='file' onChange={handleFileChange} className='mt-4 ' />
                                        <button
                                            onClick={() => handleFileUpload('cover')}
                                            style={{
                                                backgroundColor: '#30D8FF',
                                                color: 'black',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                marginTop: '20px',
                                                display: 'block',
                                                width: '100%'
                                            }}
                                        >
                                            {isUploading ? 'Uploading...' : 'Upload File'}
                                        </button>
                                        <button
                                            onClick={() => setIsCoverPopupVisible(false)}
                                            style={{
                                                backgroundColor: '#E5E7EB',
                                                color: '#000000',
                                                padding: '10px 40px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                marginTop: '10px',
                                                display: 'block',
                                                width: '100%'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </div>
                            )}

                            {isProfilePopupVisible && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1000,
                                    }}
                                >
                                    <div style={{
                                        backgroundColor: 'white',
                                        padding: '30px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'  // Ensures text is centered
                                    }}>
                                        <h2 style={{ marginBottom: '20px' }} className='text-3xl'>Upload Profile Image</h2>
                                        <h2
                                            style={{
                                                fontFamily: 'Bai Jamjuree, sans-serif',
                                                fontWeight: 300,
                                                fontSize: '15px',
                                                lineHeight: '27.5px',
                                                color: 'black'
                                            }}
                                        >
                                            Choose an image to display as your avatar. <br /> Recommended size 512 x  512px
                                        </h2>
                                        <input type='file' onChange={handleFileChange} className='mt-4 ' />
                                        <button
                                            onClick={() => handleFileUpload('profile')}
                                            style={{
                                                backgroundColor: '#30D8FF',
                                                color: 'black',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                marginTop: '20px',
                                                display: 'block',
                                                width: '100%'
                                            }}
                                        >
                                            {isUploading ? 'Uploading...' : 'Upload File'}
                                        </button>
                                        <button
                                            onClick={() => setIsProfilePopupVisible(false)}
                                            style={{
                                                backgroundColor: '#E5E7EB',
                                                color: '#000000',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                marginTop: '10px',
                                                display: 'block',
                                                width: '100%'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '500px',
                                backgroundColor: '#F3F4F6',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h2 style={{ color: '#6B7280', fontSize: '2rem', textAlign: 'center' }}>
                                Coming Soon
                            </h2>
                        </div>
                    )}
                </div >
            </div >

           <Footer/>
        </>
    );
}

export default ProfileSettingsPage;
