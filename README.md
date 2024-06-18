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

```javascript

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoTrader {
  // Struct to store information about a supported cryptocurrency
  struct Crypto {
    string name;
    uint256 price; // Price in wei
  }

  // Mapping of cryptocurrency names to their details
  mapping(string => Crypto) public cryptos;

  // Address of the owner (who can update crypto prices)
  address public owner;

  // Event emitted when a crypto price is updated
  event CryptoPriceUpdated(string name, uint256 price);

  constructor() {
    owner = msg.sender; // Set the contract deployer as the owner
  }

  // Function to add a new supported cryptocurrency (only owner)
  function addCrypto(string memory name, uint256 price) public onlyOwner {
    require(!cryptoExists(name), "Crypto already exists");
    cryptos[name] = Crypto(name, price);
  }

  // Function to update the price of a supported cryptocurrency (only owner)
  function updateCryptoPrice(string memory name, uint256 price) public onlyOwner {
    require(cryptoExists(name), "Crypto does not exist");
    cryptos[name].price = price;
    emit CryptoPriceUpdated(name, price);
  }

  // Function to check if a cryptocurrency exists
  function cryptoExists(string memory name) public view returns (bool) {
    return bytes(cryptos[name].name).length > 0;
  }

  // Function to simulate buying crypto 
  function buyCrypto(string memory name, uint256 shares) public payable {
    require(cryptoExists(name), "Crypto does not exist");
    Crypto storage crypto = cryptos[name];
    uint256 totalPrice = crypto.price * shares;
    require(msg.value >= totalPrice, "Insufficient funds");
    // Simulate buying logic (e.g., update user balance in a separate contract)
  }

  // Function to simulate selling crypto 
  function sellCrypto(string memory name) view  public {
    require(cryptoExists(name), "Crypto does not exist");
    // Simulate selling logic (e.g., update user balance and transfer funds)
  }

  // Modifier to restrict functions to the contract owner
  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can perform this action");
    _; // Code to be executed after the modifier check
  }
}
````

###### Author
Ashutosh Sharan 
(https://www.linkedin.com/in/ashutosh-sharan-177630249/)

####### License
This Cryptotrading is licensed under the MIT License
