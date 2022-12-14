import { useEffect, useState } from "react";
import "./App.css";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Network, networkList } from "../constants/networkList";
import { ellipsisMiddle } from "./util";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [network, setNetwork] = useState<Network | undefined>(undefined);

  useEffect(() => {
    isMetamaskConnected();
  }, []);

  useEffect(() => {
    window.ethereum.on("chainChanged", getNetworkDetails);
    window.ethereum.on("accountsChanged", isMetamaskConnected);

    return () => {
      (window as any).ethereum.removeListener(
        "chainChanged",
        getNetworkDetails
      );
      (window as any).ethereum.removeListener(
        "accountsChanged",
        isMetamaskConnected
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
        getNetworkDetails(window.ethereum.chainId);
        setIsConnected(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("You don't have Metamask installed");
      setIsConnected(false);
    }
  };

  const isMetamaskConnected = () => {
    if (window.ethereum.selectedAddress != null) {
      setIsConnected(true);
      setWalletAddress(window.ethereum.selectedAddress);
      getNetworkDetails(window.ethereum.chainId);
    } else {
      setIsConnected(false);
    }
  }

  return (
    <div className="App">
      {!isConnected ? (
        <div>
          <button className="btn" onClick={() => connect()}>
            <img src="/metamask-icon.svg" />
            <span>Connect</span>
          </button>
        </div>
      ) : (
        <div className="card">
          <h2>Connected: <abbr title={walletAddress!}>{ellipsisMiddle(walletAddress!)}</abbr></h2>
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
