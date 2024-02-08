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

router.post(
    "/logout-all",
    Middlewares.Auth.getUserFromCookies,
    Controllers.Auth.logoutAll
);

export default router;
