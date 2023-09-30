import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi } from '@/constants/abi';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { enableWeb3, isWeb3Enabled } = useMoralis();

  const { runContractFunction } = useWeb3Contract({
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: abi,
    functionName: "store",
    params: {
      _favoriteNum: 24,
    }
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Hey Dhanesh ! <br /> <br />
        {isWeb3Enabled ? (
          <>
            "You are connected to Metamask !
            <textarea type="text" style={{ color: 'black' }} name="name">Enter the number to store</textarea>
            < button onClick={() => runContractFunction()}>Execute</button>
          </>
        ) : (
          <button onClick={() => enableWeb3()}>Connect</button>
        )
        }
      </div>
    </main>
  )
}
