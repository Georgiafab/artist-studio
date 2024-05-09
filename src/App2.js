import "./App.css";
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";

function App() {
  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
  };

  const readMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const lock = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      Lock.abi,
      provider
    );
    console.log(lock, "lock");
    const message = await lock.message();
    alert(message);
  };

  const setMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    let lock = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      Lock.abi,
      signer
    );

    let transaction = await lock.connect(signer).setMessage("world hello!");
    let tx = await transaction.wait(1);
    let event = tx.events[0];
    let value = event.args[0];

    let message = value.toString();
    alert(message);
  };
  return (
    <div className="App">
      <button onClick={connect}>connect wallet</button>
      <button onClick={readMessage}>read message</button>
      <button onClick={setMessage}>set message</button>
    </div>
  );
}

export default App;
