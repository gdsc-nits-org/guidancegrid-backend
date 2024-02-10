import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

router.post(
    "/verify-email",
    Middlewares.Auth.checkIsEmailUnique,
    Controllers.Auth.verifyMail
);

router.post(
    "/create-user",
    Middlewares.Auth.decodeEmailfromJWT,
    Controllers.Auth.createUser
);

router.post("/login", Controllers.Auth.login);

router.get("/logout-all", Middlewares.Auth.protect, Controllers.Auth.logoutAll);

router.get("/logout", Middlewares.Auth.protect, Controllers.Auth.logout);

export default router;
