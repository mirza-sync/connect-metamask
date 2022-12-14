import { useEffect, useState } from "react";
import "./App.css";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum.selectedAddress != null) {
      setIsConnected(true);
    }
  }, []);

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
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      {!isConnected ? (
        <div className="card">
          <button className="btn" onClick={() => connect()}>
            <img src="/metamask-icon.svg" />
            <span>Connect</span>
          </button>
        </div>
      ) : (
        <>
          <h2>Connected: {window.ethereum.selectedAddress}</h2>
        </>
      )}
    </div>
  );
}

export default App;
