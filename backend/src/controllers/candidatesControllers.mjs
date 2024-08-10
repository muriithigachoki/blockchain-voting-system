import { matchedData, validationResult } from "express-validator";
import contract, { web3 } from "../web3/web3.mjs";
import convertBigIntToString from "../utils/ConvertingBigIntIntoString.mjs";

export const addPresidentialCandidateController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, image } = matchedData(req);
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .addPresidentialCandidate(username, image)
      .estimateGas({ from: accounts[0] });
    const result = await contract.methods
      .addPresidentialCandidate(username, image)
      .send({ from: accounts[0], gas: gasEstimate });
    res.send({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error("Error registaring users:", error);
    res.status(500).send({ error: error.message });
  }
};

export const getPresidentialCandidateController = async (req, res) => {
  try {
    const presidentials = await contract.methods
      .getPresidentialCandidates()
      .call();
    console.log(presidentials);
    res.send(convertBigIntToString(presidentials));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }
};

export const addGovernorCandidateController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { county, username, image } = matchedData(req);
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .addGovernorCandidate(county, username, image)
      .estimateGas({ from: accounts[0] });
    const result = await contract.methods
      .addGovernorCandidate(county, username, image)
      .send({ from: accounts[0], gas: gasEstimate });

    res.send({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error("Error registaring users:", error);
    res.status(500).send({ error: error.message });
  }
};

export const getGovernorCandidateController = async (req, res) => {
  const { filter, value } = matchedData(req);
  console.log(value);
  try {
    const governors = await contract.methods
      .getGovernorCandidates(value)
      .call();
    console.log(governors);
    res.send(convertBigIntToString(governors));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }
};

export const addMPCandidateController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { county, constituency, username } = matchedData(req);
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .addParliamentCandidate(county, constituency, username)
      .estimateGas({ from: accounts[0] });
    const result = await contract.methods
      .addParliamentCandidate(county, constituency, username)
      .send({ from: accounts[0], gas: gasEstimate });

    res.send({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error("Error registaring users:", error);
    res.status(500).send({ error: error.message });
  }
};

export const getMPCandidateController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { county, constituency } = matchedData(req);
  console.log(county, constituency);
  try {
    const memberOfParliament = await contract.methods
      .getParliamentCandidates(county, constituency)
      .call();
    res.send(convertBigIntToString(memberOfParliament));
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
export const voteForPresident = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, candidateIndex } = matchedData(req);
  console.log(userId, candidateIndex);
  try {
    const voter = await contract.methods
      .getParliamentCandidates(userId, candidateIndex)
      .call();
    res.send("you have successfuly voted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }
};
