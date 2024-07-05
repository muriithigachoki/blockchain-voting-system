import express from "express";
import contract from "../web3/web3.mjs";
import Candidate from "../models/cardidate.mjs";

const router = express.Router();
router.get("/presidential", async (req, res) => {
  try {
    const candidates = await contract.methods
      .getPresidentialCandidates()
      .call();
    for (const candidate of candidates) {
      await Candidate.findOneAndUpdate(
        { name: candidate.name, level: "presidential" },
        { votes: candidate.votes },
        { upsert: true, new: true }
      );
    }
    const storedCandidates = await Candidate.find({ level: "presidential" });
    res.json(storedCandidates);
    console.log(storedCandidates);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// router.post("")

router.get("/governor/:county", async (req, res) => {
  const { county } = req.params;
  try {
    const candidates = await contract.methods
      .getGovernorCandidates(county)
      .call();
    for (const candidate of candidates) {
      await Candidate.findOneAndUpdate(
        { name: candidate.name, level: "governor", county },
        { votes: candidate.votes },
        { upsert: true, new: true }
      );
    }
    const storedCandidates = await Candidate.find({
      level: "governor",
      county,
    });
    res.json(storedCandidates);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get("/parliament/:county/:constituency", async (req, res) => {
  const { county, constituency } = req.params;
  try {
    const candidates = await contract.methods
      .getParliamentCandidates(county, constituency)
      .call();
    for (const candidate of candidates) {
      await Candidate.findOneAndUpdate(
        { name: candidate.name, level: "parliament", county, constituency },
        { votes: candidate.votes },
        { upsert: true, new: true }
      );
    }
    const storedCandidates = await Candidate.find({
      level: "parliament",
      county,
      constituency,
    });
    res.json(storedCandidates);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export default router;
