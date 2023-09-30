import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from "react"
import { ethers } from "ethers"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // useState will allow to connect, only if it's not connected already
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);

  // connect to Metamask
  async function connect() {
    if (typeof window.ethereum != "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);

        /*
          connectedProvider is an instance connected to the Ethereum provider given by user's browser -
          Here through Metamask. The connectedProvider can be used to interact with the Ethereum blockchain, 
          send transactions, query blockchain data, and more within their web applications.
        */
        const connectedProvider = new ethers.providers.Web3Provider(window.ethereum);

        // My connected account becomes the signer & we are linking it
        setSigner(connectedProvider.getSigner());
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum != "undefined") {
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const abi = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_favNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            }
          ],
          "name": "addPerson",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "listOfPeople",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "favoriteNum",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "nameToFavNumber",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "retrieve",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_favoriteNum",
              "type": "uint256"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      // creates an instance of a smart contract, for calling its methods and interact with it
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        await contract.store(42);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Hi Dhanesh !  <br /><br />
        {isConnected ? (
          <>
            Your Account is Connected !
            < button onClick={() => execute()}>Execute</button>
          </>
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )}
      </div>
    </main >
  )
}