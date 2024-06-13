import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("NFTMarket", (m) => {
  const NFTMarket = m.contract("NFTMarket");
  return { NFTMarket };
});
