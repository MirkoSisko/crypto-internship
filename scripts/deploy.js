const hre = require("hardhat");

async function main() {
  const BlankHoodieToken = await hre.ethers.getContractFactory("BlankHoodie");
  console.log("Deploying BlankHoodie ERC721 Token!");
  const token = await BlankHoodieToken.deploy();

  await token.deployed();

  console.log("BlankHoodie token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
