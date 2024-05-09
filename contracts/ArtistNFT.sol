// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./utils/Counters.sol";

contract ArtistNFT is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ArtistNFT", "AN") {}

    function mint(
        address artist,
        string memory tokenUri
    ) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(artist, newItemId);
        _setTokenURI(newItemId, tokenUri);

        _tokenIds.increment();
        return newItemId;
    }


    // function _burn(
    //     uint256 tokenId
    // ) internal override {
    //     super._burn(tokenId);
    // }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC721URIStorage)  returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

      function _increaseBalance(address account, uint128 amount) internal virtual override(ERC721, ERC721Enumerable ) {
        super._increaseBalance(account, amount);
    }

     function _update(address to, uint256 tokenId, address auth) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
     }

       // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 firstTokenId,
    //     uint256 batchSize
    // ) internal override(ERC721, ERC721Enumerable) {
    //     super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    // }
    
}
