import { matchedData, validationResult } from "express-validator";
import contract, { web3 } from "../web3/web3.mjs";

export const addpresidentialCardidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = matchedData(req);
  console.log(name);

  try {
    // Example: interact with your Solidity contract
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods
      .addPresidentialCandidate(name)
      .send({ from: accounts[0] });

    res.send({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).send({ error: error.message });
  }
};

const convertBigIntToString = (obj) => {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertBigIntToString(value),
      ])
    );
  } else {
    return obj;
  }
};

export const getPresidentialCandidates = async (req, res) => {
  try {
    const candidates = await contract.methods
      .getPresidentialCandidates()
      .call();
    console.log(candidates);
    res.send(convertBigIntToString(candidates));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }
};
