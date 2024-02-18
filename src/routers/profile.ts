import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

router
    .get("/", Middlewares.Auth.protect, Controllers.Profile.getProfile)
    .patch("/", Middlewares.Auth.protect, Controllers.Profile.updateProfile);

export default router;
