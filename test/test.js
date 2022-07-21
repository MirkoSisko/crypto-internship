const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { formatUnits, formatEther, parseUnits } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("BlankHoodie contract", function () {
  let BlankHoodie, blankHoodieToken;
  const name = "Blank Hoodie";
  const symbol = "HOODIE";
  const minValue = BigNumber.from("1000000000000000000");
  const newMinValue = parseUnits("0.2");
  const newMaxSupply = parseUnits("499");

  beforeEach(async function () {
    BlankHoodie = await ethers.getContractFactory("BlankHoodie");
    blankHoodieToken = await BlankHoodie.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const [owner, account1, ...otherAccounts] = await ethers.getSigners();
      expect(await blankHoodieToken.owner()).to.equal(owner.address);
    });

    it("Should set the right name and symbol", async function () {
      expect(await blankHoodieToken.name()).to.equal(name);
      expect(await blankHoodieToken.symbol()).to.equal(symbol);
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner, account1, ...otherAccounts] = await ethers.getSigners();
      const ownerBalance = await blankHoodieToken.balanceOf(owner.address);
      expect(await blankHoodieToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Minting", function () {
    // it("Should mint a token to address1", async function () {
    //   const [owner, account1, ...otherAccounts] = await ethers.getSigners();
    //   console.log("Min Value ->", formatUnits(minValue));
    //   await blankHoodieToken.mint(account1.address, {
    //     value: formatUnits(minValue),
    //   });
    //   expect(await blankHoodieToken.balanceOf(account1.address)).to.equal(1);
    // });
    // it("Mint id should not exceed max supply", async function () {});
  });

  describe("Only owner functions", function () {
    it("Should set new max supply", async function () {
      await blankHoodieToken.setMaxSupply(formatUnits(newMaxSupply, "wei"));
      expect(await blankHoodieToken.getMaxSupply()).to.equal(
        formatUnits(newMaxSupply, "wei")
      );
    });

    it("Should set new min mint value", async function () {
      await blankHoodieToken.setMintPrice(formatUnits(newMinValue, "wei"));
      expect(await blankHoodieToken.getMintPrice()).to.equal(
        formatUnits(newMinValue, "wei")
      );
    });
  });

  // describe("Addresses for airdrop", function () {
  //   it("Addresses should be set to given value", async function () {});
  // });
});
