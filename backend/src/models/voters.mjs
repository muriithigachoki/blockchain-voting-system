import mongoose from "mongoose";

const VoterSchema = new mongoose.Schema({
  address: { type: String, required: true },
  hasVoted: { type: Boolean, default: false },
  vote: { type: String, required: false },
});

const voter = mongoose.model("Voter", VoterSchema);

export default voter;
