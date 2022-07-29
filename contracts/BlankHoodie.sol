// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error InvalidAmount();
error ExceededMaxSupply();

contract BlankHoodie is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public mintPrice = 0.1 ether;
    uint256 public maxSupply = 500;

    string public baseURI =
        "ipfs://QmVqodXFfpUU13GJDetcE2UtPLWMBsZubX6ZnhU3XDWhmJ";

    constructor() ERC721("Blank Hoodie", "HOODIE") {}

    // Needed to get around import errors
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Set URI
    function setBaseURI(string calldata _uri) external onlyOwner {
        baseURI = _uri;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI doesn't exist");
        return baseURI;
    }

    // Mint
    function mint(address _to) external payable returns (uint256) {
        if (_tokenIds.current() > maxSupply) revert ExceededMaxSupply();
        if (msg.value >= mintPrice) revert InvalidAmount();

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(_to, newTokenId);
        tokenURI(newTokenId);
        return newTokenId;
    }

    // Send tokens to selected addresses
    function airdrop(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _safeMint(addresses[i], newTokenId);
        }
    }

    // Set new mint price
    function setMintPrice(uint256 newMinValue) public onlyOwner {
        mintPrice = newMinValue;
    }

    // Get current mint price
    function getMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    // Set new max supply
    function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
        maxSupply = newMaxSupply;
    }

    // Get current max supply
    function getMaxSupply() public view returns (uint256) {
        return maxSupply;
    }

    // Withdraw funds
    function withdraw(address payable _to) public onlyOwner {
        _to.transfer(address(this).balance);
    }
}
