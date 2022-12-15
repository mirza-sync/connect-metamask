import { useEffect, useState } from "react";
import "./App.css";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Network, networkList } from "../constants/networkList";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [network, setNetwork] = useState<Network | undefined>(undefined);

  useEffect(() => {
    if (window.ethereum.selectedAddress != null) {
      setIsConnected(true);
      getNetworkDetails(window.ethereum.chainId);
    }
  }, []);

  useEffect(() => {
    window.ethereum.on("chainChanged", getNetworkDetails);

    return () => {
      (window as any).ethereum.removeListener(
        "chainChanged",
        getNetworkDetails
      );
    };
  }, []);

  const getNetworkDetails = async (chainId: any) => {
    const chainNum = chainIdToNum(chainId);
    const network = networkList.filter(
      (network) => chainNum === network.chainId
    )[0];
    setNetwork(network);
  };

  const chainIdToNum = (chainId: string) => {
    const hex = chainId.split("0x")[1];
    const chainNum = parseInt(hex, 16);
    return chainNum;
  };

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
        <div>
          <h2>Connected: {window.ethereum.selectedAddress}</h2>
          <div>
            <div>Network name: {network?.name ?? "Unknown"}</div>
            <div>Chain ID: {network?.chainId}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
