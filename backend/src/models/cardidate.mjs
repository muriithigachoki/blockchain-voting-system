import mongoose from "mongoose";
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: { type: String, required: true },
  votes: { type: Number, default: 0 },
  level: { type: String, required: true },
  county: { type: String },
  constituency: { type: String },
});
const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
