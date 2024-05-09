import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("ArtistNFT", (m) => {
  const artistNFT = m.contract("ArtistNFT");
  return { artistNFT };
});
