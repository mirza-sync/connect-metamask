import { useState } from "react";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("You don't have Metamask installed");
    }
  };

  return (
    <div className="App">
      {!isConnected ? (
        <>
          <h2>You are not connected to Metamask</h2>
          <div className="card">
            <button className="btn" onClick={() => connect()}>
              <img src="/metamask-icon.svg" />
              <span>Connect</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Connected: 0xabc....1ve34e</h2>
        </>
      )}
    </div>
  );
}

export default App;
