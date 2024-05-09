const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VoteModule", (m) => {
  const vote = m.contract("Vote");

  return { vote };
});
