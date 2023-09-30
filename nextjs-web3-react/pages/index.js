import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import { abi } from '@/constants/abi';
import { ethers } from 'ethers';

const inter = Inter({ subsets: ['latin'] })

// injectedConnector is used for metamask, etc.
const injected = new InjectedConnector();

export default function Home() {
  // hook to carry the connection state on all pages
  const { activate, active, library: provider } = useWeb3React();

  async function connect() {
    try {
      // connect to injected provider ( Here - Metamask )
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  }

  async function execute() {

    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        contract.store(44);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Good morning Dhanesh !  <br /> <br />
        {active ? (
          <>
            You are connected ! <button onClick={() => execute()}>Execute</button>
          </>
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )}
      </div>
    </main >
  );
}
