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
