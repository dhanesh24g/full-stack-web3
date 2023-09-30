import { ethers } from 'ethers';

const { ethers } = require('ethers');

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await ethereum.request({ method: "eth_requestAccounts" });
    }
}

async function execute() {
    /*
        To execute a function, we need 
        1. Address ✅     2. Contract ABI  ✅    3. Function ✅    4. Node connector (Metamask) ✅
    */
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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();  // to retrieve the connected Metamask account
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
        await contract.store(42);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    connect,
    execute,
}