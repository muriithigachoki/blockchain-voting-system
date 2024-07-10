import express from "express";
import { checkSchema } from "express-validator";
import { presidentialCandidate } from "../schemas/candidatesSchemas.mjs";
import {
  addpresidentialCardidate,
  getPresidentialCandidates,
} from "../controllers/candidateController.mjs";

const router = express.Router();

router
  .route("/PresidentialCandidate")
  .post(checkSchema(presidentialCandidate), addpresidentialCardidate)
  .get(getPresidentialCandidates);

export default router;
