import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
        setSignature={setSignature}
        setRecoveryBit={setRecoveryBit}
        signature={signature}
        recoveryBit={recoveryBit}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
