import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function signature(privateKey) {
    const msg = utf8ToBytes('Verifying ownership of account');
    const signature = secp.sign(msg, privateKey, {recovered: true});
    return signature
}