import {matchedData, validationResult } from "express-validator"
import contract, {web3} from "../web3/web3.mjs"
import convertBigIntToString from "../utils/ConvertingBigIntIntoString.mjs"


export const createUserController = async(req, res) =>{
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, email, password, county, constituency } = matchedData(req);
      try {
        // Example: interact with your Solidity contract
        const accounts = await web3.eth.getAccounts();
        const gasEstimate = await contract.methods
        .createUser(username, email, password , county, constituency).estimateGas({ from: accounts[0] });
        const result = await contract.methods
          .createUser(username, email, password, county, constituency)
          .send({ from: accounts[0], gas:gasEstimate });
    
        res.send({ transactionHash: result.transactionHash });
      } catch (error) {
        console.error("Error registaring users:", error);
        res.status(500).send({ error: error.message });
      }
    
}


export const loginUserController = async(req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, password } = matchedData(req);
      try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods
          .loginUser(username, password)
          .send({ from: accounts[0]});
    
        res.send({ transactionHash: result.transactionHash });
      } catch (error) {
        console.error("Error loggin users:", error);
        res.status(500).send({ error: error.message });
      }
}


export const getUserController = async(req, res) =>{

  try {
    const voters = await contract.methods
      .getAllVoters()
      .call();
    console.log(voters);
    res.send(convertBigIntToString(voters));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }
    
}