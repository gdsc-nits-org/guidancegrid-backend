import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.get("/", Controllers.Health.check);
router.post("/ping", Controllers.Health.ping);

export default router;
