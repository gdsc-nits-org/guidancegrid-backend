import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

router.get("/get", Middlewares.Auth.protect, Controllers.Profile.getProfile);

export default router;
