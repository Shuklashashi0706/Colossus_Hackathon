import React from "react";
import Image from "next/image";
import Link from "next/link"; // Use Link for navigation

const Footer = () => {
  return (
    <div>
      <footer
        style={{
          background: "linear-gradient(90deg,  #30D8FF 0%, #C243FE, #C243FE)",
          padding: "50px",
        }}
      >
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="brand">
            <Link href="#" passHref>
              <p className="text-black text-2xl font-bold mt-[10px]">
                MetaEngage
              </p>
            </Link>
            <p style={{ color: "white" }}>
              Revolutionary platform for exploring and launching NFT Xperiences.
            </p>
            {/* <p style={{ marginTop: '10px', marginBottom: '20px', color:'white' }}>
              © Copyright 2023 - 2024 MyriadFlow. All rights reserved
            </p> */}
          </div>

          <section
            id="connect"
            className="py-10 px-2 text-white text-center m48:flex flex-col justify-center items-center"
          >
            <div
              className="text-xl flex flex-row justify-center gap-6 items-center"
              style={{ gap: "20px" }}
            >
              <div>
                <div
                  style={{
                    border: "2px solid #0E46A3",
                    backgroundColor: "#15063C",
                    borderRadius: "50px",
                  }}
                >
                  <div style={{ padding: "28px" }}>
                    {/* <Link href="https://discord.gg/38jktRtuY7" target="_blank"> */}
                    <img
                      src="./Vector3.png"
                      width={20}
                      height={20}
                      alt="Discord logo"
                    />
                    {/* </Link> */}
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    border: "2px solid #0E46A3",
                    backgroundColor: "#15063C",
                    borderRadius: "50px",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "29px",
                      paddingBottom: "29px",
                      paddingLeft: "27px",
                      paddingRight: "27px",
                    }}
                  >
                    {/* <Link href="https://t.me/MyriadFlow" target="_blank"> */}
                    <img
                      src="./Vector4.png"
                      width={20}
                      height={20}
                      alt="Telegram logo"
                    />
                    {/* </Link> */}
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    border: "2px solid #0E46A3",
                    backgroundColor: "#15063C",
                    borderRadius: "50px",
                  }}
                >
                  <div style={{ padding: "28px" }}>
                    {/* <Link href="https://x.com/0xMyriadFlow" target="_blank"> */}
                    <img
                      src="./Vector2.jpeg"
                      width={18}
                      height={18}
                      alt="X logo"
                    />
                    {/* </Link> */}
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    border: "2px solid #0E46A3",
                    backgroundColor: "#15063C",
                    borderRadius: "50px",
                  }}
                >
                  <div style={{ padding: "28px" }}>
                    {/* <Link href="https://www.instagram.com/0xmyriadflow" target="_blank"> */}
                    <img
                      src="./Vector5.png"
                      width={16}
                      height={16}
                      alt="Instagram logo"
                    />
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
