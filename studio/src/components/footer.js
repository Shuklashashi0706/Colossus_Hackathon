import React from 'react';
import Link from 'next/link'; 

const Footer = () => {
  return (
    <div>
      <footer style={{ background: 'linear-gradient(90deg, #30D8FF 0%, #A32CC4 50%, #C243FE 100%)', padding: '40px 60px' }}>
        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="brand" style={{ textAlign: 'left' }}>
            <Link href="https://myriadflow.com/" passHref>
              <p className='text-black text-2xl font-bold '>MetaEngage</p>
            </Link>
            <p style={{ color: 'white', maxWidth: '350px', fontSize: '19px' }}>
            Revolutionary platform for exploring and launching NFT Xperiences.
            </p>
            {/* <p style={{ marginTop: '30px', color: 'white', fontSize: '15px' }}>
              © Copyright 2024 MyriadFlow. All rights reserved
            </p> */}
          </div>

          <div className="links" style={{ textAlign: 'left', color: 'white', fontSize: '14px' }}>
            <h3 className='text-2xl font-semibold'>About</h3>
            <Link href="#" target="_blank" style={{ color: 'white', textDecoration: 'none', display: 'block', marginTop: '28px' , fontSize: '15px'}}>
              Terms of Service
            </Link>
            <Link href="#" target="_blank" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>
              Creator Terms and Conditions
            </Link>
            <Link href="#" target="_blank" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>
              Privacy Policy
            </Link>
            <Link href="#" target="_blank" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>
              Community Guidelines
            </Link>
          </div>

          <div className="platform" style={{ textAlign: 'left', color: 'white', fontSize: '14px' }}>
            <h3 className='text-2xl font-semibold'>Platform</h3>
            <Link href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', marginTop: '28px' ,fontSize: '15px' }}>
              Studio
            </Link>
            <Link href="#" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>
              Discover
            </Link>
            <Link href="#" style={{ color: 'white', textDecoration: 'none', display: 'block'}}>
              WebXR
            </Link>
          </div>

          <section
            id="connect"
            className="social-links"
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}
          >
            {['/images/Vector3.png', '/images/Vector4.png', '/images/Vector2.png', '/images/Vector5.png'].map((icon, index) => (
              <div key={index} style={{ borderRadius: '50%', border: '2px solid #0E46A3', padding: '16px', backgroundColor: '#15063C' }}>
                <Link href="#" >
                  <img
                    src={icon}
                    width={20}
                    height={20}
                    alt="Social Icon"
                  />
                </Link>
              </div>
            ))}
          </section>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
