require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "7FWqOnBRuyp7KKJ6tFPljlDpt4tIt5Ra";

const GOERLI_PRIVATE_KEY = "30ba43b5cd5dc086ce6d0bb9f7983da688f502450bf5413ba1b0044c81cde514";

module.exports = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
