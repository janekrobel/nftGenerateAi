require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/a89fc1de7ad2450da2ca305a134730be",
      accounts: ['0x940cecb3c0fee1850415258f51bceb66b773d2b1470fb4c69bfa7f8a864dd2d8'],

    }
  }
};
