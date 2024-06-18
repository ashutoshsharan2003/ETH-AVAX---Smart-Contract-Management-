const contractAddress = "0x8177DBCD6Bd623Bc0bF658e1F95CCa1Cd74F3E3b";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "CryptoPriceUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addCrypto",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "buyCrypto",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "cryptoExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "cryptos",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "sellCrypto",
		"outputs": [],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "updateCryptoPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

async function connect() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    const account = await signer.getAddress();
    document.getElementById('account').innerText = `Connected account: ${account}`;
	console.log(`Connected account: ${account}`);
  } else {
    alert("MetaMask not found. Please install it.");
  }
}

async function addCrypto() {
  const name = document.getElementById("addName").value;
  const price = document.getElementById("addPrice").value;

  try {
    const tx = await contract.addCrypto(name, price);
    await tx.wait();
    alert(`Added crypto ${name} with price ${price}`);
  } catch (error) {
    console.error(error);
    alert("Failed to add crypto");
  }
}

async function updateCryptoPrice() {
  const name = document.getElementById("updateName").value;
  const price = document.getElementById("updatePrice").value;

  try {
    const tx = await contract.updateCryptoPrice(name, price);
    await tx.wait();
    alert(`Updated crypto ${name} with new price ${price}`);
  } catch (error) {
    console.error(error);
    alert("Failed to update crypto price");
  }
}

async function buyCrypto() {
  const name = document.getElementById("buyName").value;
  const shares = document.getElementById("buyShares").value;
  const amount = document.getElementById("buyAmount").value;

  try {
    const tx = await contract.buyCrypto(name, shares, { value: amount });
    await tx.wait();
    alert(`Bought ${shares} shares of ${name}`);
  } catch (error) {
    console.error(error);
    alert("Failed to buy crypto");
  }
}

async function sellCrypto() {
  const name = document.getElementById("sellName").value;

  try {
    await contract.sellCrypto(name);
    alert(`Sold ${name}`);
  } catch (error) {
    console.error(error);
    alert("Failed to sell crypto");
  }
}

window.onload = connect;
