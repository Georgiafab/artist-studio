import "./App.css";
import { ethers } from "ethers";
import Vote from "./artifacts/contracts/Vote.sol/Vote.json";
import React, { useState } from "react";

function App() {
  const [proposalIndex, setProposalIndex] = useState();
  const [proposal, setProposal] = useState();
  const [proposalName, setProposalName] = useState({});
  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  };

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    let vote = new ethers.Contract(
      "0x0E801D84Fa97b50751Dbf25036d067dCf18858bF",
      Vote.abi,
      signer
    );
    return { vote, signer };
  };

  const sendCreateProposal = async () => {
    const { vote, signer } = await getContract();
    await vote.connect(signer).createProposal(proposal);
  };

  const voting = async () => {
    try {
      const { vote, signer } = await getContract();
      await vote.connect(signer).vote(proposalIndex);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const getProposal = async () => {
    const { vote, signer } = await getContract();
    try {
      let [name, total] = await vote.connect(signer).getProposal(proposalIndex);
      setProposalName({ name, total });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <button onClick={connect}>连接钱包</button>
      {/* <button onClick={readMessage}>read message</button> */}
      <input
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        placeholder="请输入提案名称"
      />
      <button onClick={sendCreateProposal}>提交提案</button>
      <br />
      <input
        value={proposalIndex}
        onChange={(e) => setProposalIndex(e.target.value)}
        placeholder="请输入提案号"
      />
      <button onClick={voting}>投票</button>
      <br />
      <input
        value={proposalIndex}
        onChange={(e) => setProposalIndex(e.target.value)}
        placeholder="请输入提案号"
      />
      <button onClick={getProposal}>查看提案投票结果</button>
      {proposalName.name && `${proposalName.name}:${proposalName.total}`}
    </div>
  );
}

export default App;
