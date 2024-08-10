import express from "express";
import { checkSchema } from "express-validator";
import {
  voteForPresidentialController,
  voteForGovernorController,
} from "../controllers/voting/VotingControllers.mjs";
import {
  voteForPresidentSchema,
  voteForGovernorSchema,
} from "../schemas/voting/VotingSchemas.mjs";

const router = express.Router();

router
  .route("/president/vote")
  .post(checkSchema(voteForPresidentSchema), voteForPresidentialController);

router
  .route("/Governor/vote")
  .post(checkSchema(voteForGovernorSchema), voteForGovernorController);

export const presidentVotingRouter = router;
