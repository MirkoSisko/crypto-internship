// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlankHoodie is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public _deployer;

    mapping(uint256 => string) _tokenURIs;

    address[] public addresses;

    uint256 public mintPrice = 100000000000000000;
    uint256 public maxSupply = 500;

    constructor() ERC721("Blank Hoodie", "HOODIE") {
        _deployer = _msgSender();
    }

    // Set addresses for airdrop
    function setAddresses(address[] memory _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            if (!exists(_addresses[i])) {
                addresses.push(_addresses[i]);
            }
        }
    }

    // Check if already contains address, if not add to addresses
    function exists(address _address) public view returns (bool) {
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == _address) {
                return true;
            }
        }
        return false;
    }

    // Get all airdrop addresses
    function getAddresses() public view returns (address[] memory) {
        return addresses;
    }

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

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI not exist on that ID");
        string memory _RUri = _tokenURIs[tokenId];
        return _RUri;
    }

    // Mint
    function mint(address _to, string memory metadata)
        public
        payable
        returns (uint256)
    {
        require(_tokenIds.current() < maxSupply, "Exceeded max supply!");
        require(msg.value >= mintPrice, "Not enough ETH sent; check price!");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(_to, newTokenId);
        _setTokenURI(newTokenId, metadata);

        return newTokenId;
    }

    // Send tokens to selected addresses
    function airdrop(uint256[] memory tokenIds) public onlyOwner {
        require(
            addresses.length == tokenIds.length,
            "Recievers and IDs have different lengths!"
        );
        for (uint256 i = 0; i < tokenIds.length; i++) {
            safeTransferFrom(_deployer, addresses[i], tokenIds[i]);
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
