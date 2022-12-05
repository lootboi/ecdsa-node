const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require("ethereum-cryptography/keccak");

// Function to hash the public key generated into an ethereum format address
function getAddress(publicKey) {
    let hash = keccak256(publicKey.slice(1));
    return hash.slice(-20);
};

// Constants defining the private key, public key, and ethAddress generated from both
const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const ethAddress = '0x' + toHex(getAddress(publicKey));

// Print all of the keys and address generated
console.log('Private key:', toHex(privateKey));
console.log('Public key:', toHex(publicKey));
console.log('Ethereum address:', ethAddress);

// 