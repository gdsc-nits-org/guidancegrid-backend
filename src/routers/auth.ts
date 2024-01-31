import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

router.post("/verify-email", Controllers.Auth.verifyMail);
router.post(
    "/create-user",
    Middlewares.Auth.decodeEmailfromJWT,
    Controllers.Auth.createUser
);

export default router;
