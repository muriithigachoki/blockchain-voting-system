import express from "express";
import { web3 } from "./web3/web3.mjs";
import router from './routes/index.mjs'

const app = express();
app.use(express.json());
const port = process.env.PORT || 3002;

app.use("/api/v1", router);

app.listen(port, async () => {
  console.log(`server running on port ${port}`);
  try {
    const isListening = await web3.eth.net.isListening();
    console.log("Connected to Ethereum network:", isListening);
  } catch (error) {
    console.error("Failed to connect to Ethereum network:", error.message);
  }
});
