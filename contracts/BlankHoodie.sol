// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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
    function setBaseURI(string calldata _uri) public onlyOwner {
        baseURI = _uri;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI not exist on that ID");
        string memory _RUri = baseURI;
        return _RUri;
    }

    // Mint
    function mint(address _to) external payable returns (uint256) {
        require(_tokenIds.current() < maxSupply, "Exceeded max supply!");
        require(msg.value >= mintPrice, "Not enough ETH sent; check price!");

        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();

        _safeMint(_to, newTokenId);
        tokenURI(newTokenId);
        return newTokenId;
    }

    function getTokenIds() public view returns (uint256[] memory) {
        uint256 latestId = _tokenIds.current();
        uint256[] memory tempArray = new uint256[](latestId);
        for (uint256 i = 1; i < latestId; i++) {
            if (_exists(i)) {
                tempArray[i] = i;
            }
        }
        return tempArray;
    }

    // Send tokens to selected addresses
    function airdrop(address[] calldata addresses, uint256[] calldata tokenIds)
        external
        onlyOwner
    {
        require(
            addresses.length == tokenIds.length,
            "Recievers and IDs have different lengths!"
        );
        for (uint256 i = 0; i < tokenIds.length; i++) {
            safeTransferFrom(owner(), addresses[i], tokenIds[i]);
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
        _to.transfer(balanceOf(_to));
    }
}
