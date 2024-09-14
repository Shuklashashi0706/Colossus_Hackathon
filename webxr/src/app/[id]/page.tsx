"use client";
import { InfoCard } from "@/components/info-card";
import Image from "next/image";
import { Avatar } from "@readyplayerme/visage";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@/components/connect-wallet";
import { useEffect, useState } from "react";
import { ConnectWalletModal } from "@/components/connect-wallet-modal";
import { NfcMintPopUp } from "@/components/nfc-mint-popup";
import { ClaimNft } from "@/components/claim-nft";

import { CreateWallet } from "@/components/create-wallet";
import { VoiceAssistant } from "@/components/voice-assistant";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  const baseUri = "https://app.myriadflow.com";
  const [unlockModal, setUnlockModal] = useState(false);
  const [unlocked, setUnlocked] = useState(true);
  const [unlockClaimed, setUnlockClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phygitalData, setPhygitalData] = useState<any>([]);
  const [webXrData, setWebXrData] = useState<any>([]);
  const [avatar, setAvatar] = useState<any>([]);
  const [productInfo, setProductInfo] = useState<any>("");

  const account = useAccount();

  const closeCongratulations = () => {
    setUnlockModal(false);
  };

  const closeClaimed = () => {
    setUnlockClaimed(false);
  };

  const fetchPhygitalData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUri}/phygitals/${id}`);

      const webxr = await fetch(`${baseUri}/webxr/phygital/${id}`);

      const avatarRes = await fetch(`${baseUri}/avatars/phygital/${id}`);

      const data = await res.json();
      const webdata = await webxr.json();
      console.log("webdata", webdata);

      const avatardata = await avatarRes.json();

      // console.log(data)
      // console.log(avatardata)

      setProductInfo(data.product_info);
      setPhygitalData(data);
      setWebXrData(webdata);
      setAvatar(avatardata);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhygitalData();

    setTimeout(() => {
      setUnlockModal(true);
    }, 3000);
  }, []);

  // useEffect(() => {
  // 	if (account.address) {
  // 		setTimeout(() => {
  // 			setUnlockClaimed(true)
  // 		}, 3000)
  // 	}
  // }, [])

  const removePrefix = (uri: string) => {
    // Check if the URI starts with 'ipfs://', then replace it with the required base URL
    if (uri.startsWith("ipfs://")) {
      return uri.replace("ipfs://", "");
    }
    return uri; // Return the URI as is if it doesn't start with 'ipfs://'
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Image src={"/spinner.svg"} alt="loading" height={300} width={300} />
      </div>
    );

  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 relative">
      <header className="absolute top-0 p-4 w-full flex justify-between z-10">
        <div className="mt-4">
            <p className="text-black text-2xl font-bold">MetaEngage</p>
        </div>
        <ConnectWallet />
      </header>
      {webXrData ? (
        <a-scene className="h-48">
          <a-sky
            src={
              webXrData.image360 && typeof webXrData.image360 === "string"
                ? `https://nftstorage.link/ipfs/${removePrefix(
                    webXrData.image360
                  )}`
                : "" // Fallback if image360 is not valid
            }
            rotation="0 -130 0"
          ></a-sky>
        </a-scene>
      ) : null}

      <section>
        <div className="absolute right-2 bottom-2">
          <InfoCard phygital={phygitalData} />
        </div>

        <div className="absolute transform -translate-x-1/2 text-white bottom-2">
          <VoiceAssistant
            productInfo={productInfo}
            brandName={phygitalData.brand_name}
            voice={avatar.avatar_voice}
          />
        </div>
        <div className="absolute h-3/4 left-4 bottom-16">
          <Avatar modelSrc={avatar && avatar.url} cameraInitialDistance={3.5} />
          <button className="border-2 border-white text-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2">
            {account.address ? "Customize" : "Unlock"}
          </button>
        </div>
        {!account.address && (
          <div className="absolute inset-0">
            <ConnectWalletModal />
          </div>
        )}
        {account.address && unlockModal && (
          <div className="absolute inset-0">
            <NfcMintPopUp
              onClose={closeCongratulations}
              phygitalName={phygitalData.name}
            />
          </div>
        )}
        {unlockClaimed && (
          <div className="absolute inset-0">
            <ClaimNft
              onClose={closeClaimed}
              freeNft={webXrData.free_nft_image}
              brandName={phygitalData.brand_name}
              phygitalName={phygitalData.name}
              contractAddress={phygitalData.contract_address}
              chainTypeId={phygitalData.chaintype_id}
              collectionId={phygitalData.collection_id}
              phygitalId={phygitalData.id}
            />
            -
          </div>
        )}
      </section>
    </main>
  );
}
