import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";


function getAddress(publicKey) {
    let hash = keccak256(publicKey.slice(1));
    return toHex(hash.slice(-20));
};

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
  return hash
}

// function getSignature(privateKey) {
//   const msg = hashMessage('Approving transaction');
//   const signature = secp.sign(msg, privateKey, {recovered: true});
//   console.log('Hashed Message', msg);
//   return signature;
// }
async function getSignature(privateKey) {
  const msg = hashMessage('Approving transaction');
  let response = await secp.sign(msg, privateKey, {recovered: true});
  return response
}

function Wallet({ 
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  publicKey,
  setPublicKey,
  signature,
  setSignature,
  recoveryBit,
  setRecoveryBit }) {
  async function onChange(evt) {

    // Set Private Key
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    // Get Public Key from Private Key
    const publicKey = secp.getPublicKey(privateKey);
    setPublicKey(toHex(publicKey));
    console.log('Public Key', publicKey);

    // Get Address from Public Key
    const address = getAddress(publicKey);
    setAddress('0x' + address);

    // Get Signature and recoveredBit from Private Key
    const response = await getSignature(privateKey);
    const [signature, recoveryBit] = response;
    console.log('Signature:', signature);
    console.log('Recovery Bit:', recoveryBit);
    setSignature(toHex(signature));
    setRecoveryBit(recoveryBit);

    // Get Balance from Address
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${'0x' + address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Sign Transaction</h1>

      <label>
        Enter Private Key
        <input placeholder="Type a Private Key..." value={privateKey} onChange={onChange}></input>
      </label>
      <div className="output">Balance: {balance}</div>
      <div className="output">Public Key: {publicKey}</div>
      <div className="output">Address: {address}</div>
      <div className="output">Signature: {signature}</div>
      <div className="output">Recovery Bit: {recoveryBit}</div>
    </div>
  );
}

export default Wallet;
