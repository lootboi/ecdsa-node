const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// Private keys for reference (randomly generated for testing purposes)
// f07dcd7c2c87ed4e45b141c85bc086e0809db08182998a2c567d4ef31ba9257c
// c8662b5009dbb38ef4d819c9d32444039d76f7b653080cc3fad7c863daf6571b
// 07b3b524c2e6514a4bb608ed8c23d8dda2b1115399dc49fc98630788f45e9643

// Public keys for reference (randomly generated for testing purposes)
// 049a9c0a4adcb04af3afff5c912655f558c700cc5b2f325ade923ff08b25a3921a22fbc24322fed863d2096af834b52328da8d5c2348e840f85dc50d1f2ca4605c
// 04bd4c2ebb550e746cfdb763af2f68d4cb1e9cc11374b30b542bdb0b0b30299413e95c82fe39b50dc3c6f9c5060395d1a1436e8d50979257b4f35bd335db01d9db
// 049f607b35ee3c749a0ee82b01706c0722b6c234cdf1f11b162eea0e74361a08aa9a5e1e55b4f1d3f429c0c0215d9049db006b6da245bcd3bbd0394cac9e76be67

const balances = {
  "0x1e93c083940bdc1ce13f926221303913dc1b0283": 100, // Alice
  "0xc4e73b14ff20c1d4fb41d82dcedec09428d2f6af": 50,  // Bob
  "0x3d470ce2750f62e3021a5f2ee76d046dd38f8793": 75,  // Charlie
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
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
