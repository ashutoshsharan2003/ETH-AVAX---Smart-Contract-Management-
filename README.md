# CryptoTrader Smart Contract
The CryptoTrader smart contract is designed to manage and facilitate trading of supported cryptocurrencies on the Ethereum blockchain. It allows the contract owner to add and update cryptocurrency details, and users to simulate buying and selling these cryptocurrencies.

## Function
>>Add Cryptocurrencies: Only the contract owner can add new supported cryptocurrencies.
>>Update Cryptocurrency Prices: The contract owner can update the prices of the supported cryptocurrencies.
>>Buy Cryptocurrencies: Users can simulate buying cryptocurrencies by sending Ether to the contract.
>>Sell Cryptocurrencies: Users can simulate selling cryptocurrencies.


### Description
The CryptoTrader smart contract is a Solidity-based Ethereum contract designed to manage a portfolio of cryptocurrencies and facilitate their trading. This contract allows the contract owner to add new cryptocurrencies, update their prices, and provides functionalities for users to simulate buying and selling these cryptocurrencies.

>> Structs and Mappings:
        1. The Crypto struct stores the name and price of each supported cryptocurrency.
        2. A mapping called cryptos links the name of each cryptocurrency to its details.

>> Owner Management:
        1. The owner address is set to the contract deployer and is the only entity allowed to add or update cryptocurrencies.

>> Functions:
        1. constructor: Initializes the contract and sets the deployer as the owner.
        2. addCrypto: Adds a new cryptocurrency to the portfolio if it does not already exist. 
        3. This function is restricted to the owner.
        4. updateCryptoPrice: Updates the price of an existing cryptocurrency. This function is also restricted to the owner.
        5. cryptoExists: Checks if a cryptocurrency exists in the portfolio.
        6. buyCrypto: Allows users to simulate the purchase of a specified number of cryptocurrency shares, requiring sufficient Ether to cover the total price.
        7.sellCrypto: Allows users to simulate the sale of a cryptocurrency. The logic for updating user balances and transferring funds should be implemented separately.

>> Access Control:
        The onlyOwner modifier restricts certain functions to be called only by the contract owner.


#### Getting Started

##### Executing program

To run this program, First create a directory , switch to that directory and open it in vs code.

>>Run npm i, this will install the dependencies.
>>run npx hardhat node this will create a local blockchain. from the provided private keys copy anyone and import in metamask.
>>open new terminal and run npx hardhat run --network localhost scripts/deploy.js . This will compile and deploy the contract on hardhat node. contract address will be printed in the terminal, copy and paste that address in contractAddress value in src\script.js file.
>>naviage to ../artifacts/contracts/MessageSystem.sol/MessageSystem.json file and copy the abi address which looks like :
    
```js
    "abi": [
      {.....}
     ]
```

and paste this for the value of contractABI. 5) Now open index.html. 6) in metamask set network to localhost 7) click connect wallet now you can interact with UI add/remove member as hod/faculity, send messages. And at last can check the designation of member in integer form(in console) by providing its address.


###### Author
Ashutosh Sharan 
(https://www.linkedin.com/in/ashutosh-sharan-177630249/)

####### License

This Cryptotrading is licensed under the MIT License
