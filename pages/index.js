import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { client } from "../lib/sanityClient.js";
import toast, { Toaster } from "react-hot-toast";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

export default function Home() {
  const address = useAddress();
  const connectWithMetaMask = useMetamask();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome Back ${userName !== "Unnamed" ? `${userName}` : ""} !`,
      {
        style: {
          backgroundColor: `#04111d`,
          color: "white",
        },
      }
    );
  };

  const createUser = async (address) => {
    const userDoc = {
      _type: "users",
      _id: address,
      userName: "Unnamed",
      walletAddress: address,
    };
    const result = await client.createIfNotExists(userDoc);
    welcomeUser(result.userName);
  };

  console.log("address", address);
  useEffect(() => {
    if (!address) return;
    else createUser(address);
  }, [address]);
  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false}/>
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <>
          <button className={style.button} onClick={connectWithMetaMask}>
            Connect Wallet
          </button>
          <div className={style.details}>
            You need MetaMask or similir wallet extension to run this app.
          </div>
        </>
      )}
    </div>
  );
}
