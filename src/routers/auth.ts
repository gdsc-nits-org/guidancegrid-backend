import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.post("/verify-email", Controllers.Auth.verifyMail);

export default router;
