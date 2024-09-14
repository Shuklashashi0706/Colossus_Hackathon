import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-[#30D8FF] via-[#A32CC4] to-[#C243FE] p-10 lg:p-16">
        <section className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
          <div className="brand text-left">
            <Link href="#" passHref>
              <p className="w-32 sm:w-48 text-black text-2xl font-bold">
                MetaEngage
              </p>
            </Link>
            <p className="text-white max-w-xs text-sm">
              Innovative next-gen platform for exploring and launching NFT
              Xperiences with AI-powered brand ambassadors and no-code tools.
            </p>
          </div>

          <div className="links text-left text-white text-sm">
            <h3 className="text-2xl font-semibold">About</h3>
            <Link
              href="#"
              target="_blank"
              className="block mt-7 text-white no-underline"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              target="_blank"
              className="block text-white no-underline"
            >
              Creator Terms and Conditions
            </Link>
            <Link
              href="#"
              target="_blank"
              className="block text-white no-underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              target="_blank"
              className="block text-white no-underline"
            >
              Community Guidelines
            </Link>
          </div>

          <div className="platform text-left text-white text-sm mr-20">
            <h3 className="text-2xl font-semibold">Platform</h3>
            <Link
              href="#"
              className="block mt-7 text-white no-underline"
            >
              Studio
            </Link>
            <Link
              href="#"
              className="block text-white no-underline"
            >
              Discover
            </Link>
            <Link
              href="#"
              className="block text-white no-underline"
            >
              WebXR
            </Link>
          </div>

          <section
            id="connect"
            className="social-links flex justify-center lg:justify-end gap-5"
          >
            {[
              "/Vector3.png",
              "/Vector4.png",
              "/Vector2.png",
              "/Vector5.png",
            ].map((icon, index) => (
              <div
                key={index}
                className="rounded-full border-2 border-[#0E46A3] p-4 bg-[#15063C]"
              >
                <Link href="#" target="_blank">
                  <img src={icon} width={20} height={20} alt="Social Icon" />
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
