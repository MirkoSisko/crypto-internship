require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/EBa2mJHdCf_aI272FZFk5KHFGr6DroFg",
      // If using main wallet DO NOT share this info
      accounts: [
        "70dcb1918708ee2ad96e9d9ef633ad9ca5f35373214c71d9a6132f86eeace915",
      ],
    },
  },
};
