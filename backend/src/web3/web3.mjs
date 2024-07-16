import Web3 from "web3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const web3 = new Web3("http://127.0.0.1:7545");

const contractPath = path.join(
  __dirname,
  "../../../blockchain/build/contracts/voting.json"
);
const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const contractABI = contractJSON.abi;
const contractAddress = "0x53461a940CFF88810dC5d1881Bd89d3eB140778F";

const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;
