const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// Private keys for reference
// 64795d0461aa34525e70207efb21c1f4f7fde872ebf9ce0c14aa21126887ce15
// 8e34b8d6db6a6fd4d96a430debaec8402b845f3c1dfffdcae4363a627247db53
// 175deb5b0e83ec47965d8504c02e05f6b9a2442c4076daad664b511ef1d0ef5f

const balances = {
  "047c51ff54a58d8053a4a2f9ac6fae61d10aa38391c1d22c34d2810cbcae6ebcdc1ca8c5473e1b3dfb7e13a2d42101070ca9a34fdde10d24d2ac8ec44f3e0645de": 100, // Alice
  "046aba506b16a957a37998ec07417b7e7bb23d01459047e1091832418aa4383024de91c372e20fe9dfa9eedf86af807c1855f3fcf44c74e45d71e6bf16f60f23a6": 50, // Bob
  "04912b4f2b86a6f2274ddfcf7007e80147914c30e9ee1db98cc8d33384852557ccf3d962aab658d93bd3b4eb6daf00dd91e1d2adde25792fbf3a410a4912e963c3": 75, // Charlie
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side apllication
  // Recover the public key from the signature
  // Check that the public key matches the sender address
  // Check that the sender has enough funds
  
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
