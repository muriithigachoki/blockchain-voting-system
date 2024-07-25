import { Router } from "express";
import { authRouter } from "./authRouters.mjs";
import { candidateRouter } from "./candidatesRoutes.mjs";
import { presidentVotingRouter } from "./votingRoutes.mjs";

const router = Router();

router.use(authRouter);
router.use(candidateRouter);
router.use(presidentVotingRouter);

export default router;
