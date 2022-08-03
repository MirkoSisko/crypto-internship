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
  const airdropAddresses = [
    "0x376288543987d940206a75E89Eaaa2A95A57F90B",
    "0xbf13Eb4a42043F1AcFDa216c3b6547075492B732",
  ];

  beforeEach(async function () {
    BlankHoodie = await ethers.getContractFactory("BlankHoodie");
    blankHoodieToken = await BlankHoodie.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const [owner] = await ethers.getSigners();
      expect(await blankHoodieToken.owner()).to.equal(owner.address);
    });

    it("Should set the right name and symbol", async function () {
      expect(await blankHoodieToken.name()).to.equal(name);
      expect(await blankHoodieToken.symbol()).to.equal(symbol);
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();
      const ownerBalance = await blankHoodieToken.balanceOf(owner.address);
      expect(await blankHoodieToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Minting", function () {
    it("Should mint a token to address1", async function () {
      const [owner] = await ethers.getSigners();
      await blankHoodieToken.mint(owner.address, {
        value: Number(formatUnits(minValue)),
      });
      expect(await blankHoodieToken.balanceOf(owner.address)).to.equal(1);
    });

    it("Should airdrop new tokens to set addresses", async function () {
      await blankHoodieToken.airdrop(airdropAddresses);
      expect(await blankHoodieToken.totalSupply()).to.equal(
        airdropAddresses.length
      );
    });
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
});
