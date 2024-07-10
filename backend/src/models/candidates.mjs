import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true }, // president, governor, parliament
  county: { type: String, required: false }, // only for governor and parliament
  constituency: { type: String, required: false }, // only for parliament
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export default Candidate;
