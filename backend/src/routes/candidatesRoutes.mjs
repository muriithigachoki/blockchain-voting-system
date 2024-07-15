import express from "express";
import { checkSchema } from "express-validator";
import {
  addGovernorCandidateController,
  addPresidentialCandidateController,
  getPresidentialCandidateController,
  getGovernorCandidateController,
  addMPCandidateController,
  getMPCandidateController,
} from "../controllers/candidatesControllers.mjs";
import {
    addMPSchema,
    getGovernorSchema,
  getMPSchema,
  governorSchema,
  presidetialSchema,
} from "../schemas/candidateSchema.mjs";

const router = express.Router();

router
  .route("/PresidentialCandidate")
  .post(checkSchema(presidetialSchema), addPresidentialCandidateController)
  .get(getPresidentialCandidateController);

router
  .route("/GovernorCandidate")
  .post(checkSchema(governorSchema), addGovernorCandidateController)
  .get(checkSchema(getGovernorSchema) ,getGovernorCandidateController);
router
  .route("/MPCandidate")
  .post(checkSchema(addMPSchema), addMPCandidateController)
  .get(checkSchema(getMPSchema), getMPCandidateController);

export const candidateRouter = router;