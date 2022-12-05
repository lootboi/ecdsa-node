import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function getAddress(publicKey) {
    let hash = keccak256(publicKey.slice(1));
    return toHex(hash.slice(-20));
};

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = getAddress(secp.getPublicKey(privateKey));
    setAddress('0x' + address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${'0x'+address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a Private Key..." value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address: {address.slice(0,5)}...{address.slice(-5)}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
