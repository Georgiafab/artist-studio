import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("VoteModule", (m) => {
  const vote = m.contract("ERC20Token", ["myErc20", "¥", 1000]);
  return { vote };
});
