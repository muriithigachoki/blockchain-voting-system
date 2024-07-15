import { Router } from "express";
import {authRouter} from "./authRouters.mjs";
import {candidateRouter} from "./candidatesRoutes.mjs";

const router = Router()

router.use(authRouter)
router.use(candidateRouter)


export default router