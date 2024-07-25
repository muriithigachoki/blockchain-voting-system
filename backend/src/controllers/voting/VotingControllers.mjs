import { matchedData, validationResult } from "express-validator";
import contract, { web3 } from "../../web3/web3.mjs";

export const voteForPresidentialController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, candidateIndex } = matchedData(req);
  console.log(userId, candidateIndex);
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .voteForPresident(userId, candidateIndex)
      .estimateGas({ from: accounts[0] });
    const result = await contract.methods
      .voteForPresident(userId, candidateIndex)
      .send({ from: accounts[0], gas: gasEstimate });
    res.send({ transactionHash: result.transactionHash });
  } catch (error) {
    res
      .status(500)
      .send({ error: `${error.message} you have already voted for president` });
  }
};

export const voteForGovernorController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { county, userId, candidateIndex } = matchedData(req);
  console.log(county, userId, candidateIndex);
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .voteForGovernor(county, userId, candidateIndex)
      .estimateGas({ from: accounts[0] });
    const result = await contract.methods
      .voteForGovernor(county, userId, candidateIndex)
      .send({ from: accounts[0], gas: gasEstimate });
    res.send({ transactionHash: result.transactionHash });
  } catch (error) {
    res
      .status(500)
      .send({ error: `${error.message} you have already voted for president` });
  }
};
