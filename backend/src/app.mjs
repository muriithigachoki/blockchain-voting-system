import express from "express";
import mongoose from "mongoose";
import candidatesRouter from "./routes/candidatesRoutes.mjs";
import { web3 } from "./web3/web3.mjs";

const app = express();
app.use(express.json());
app.use("/api/v1/candidates", candidatesRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/blockchainvotingdb")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`server running on port ${port}`);
  try {
    const isListening = await web3.eth.net.isListening();
    console.log("Connected to Ethereum network:", isListening);
  } catch (error) {
    console.error("Failed to connect to Ethereum network:", error.message);
  }
});
