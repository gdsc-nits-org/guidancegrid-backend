import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

router.post(
    "/verify-email",
    Middlewares.Auth.checkIfEmailExists,
    Controllers.Auth.verifyMail
);

router.post(
    "/create-user",
    Middlewares.Auth.decodeEmailfromJWT,
    Controllers.Auth.createUser
);

router.get(
    "/is-loggedin",
    Middlewares.Auth.protect,
    Controllers.Auth.isLoggedIn
);

router.post("/login", Controllers.Auth.login);

router.get("/logout-all", Middlewares.Auth.protect, Controllers.Auth.logoutAll);

router.get("/logout", Middlewares.Auth.protect, Controllers.Auth.logout);

router.post(
    "/send-mail-forgot-password",
    Middlewares.Auth.checkIfEmailExists,
    Controllers.Auth.sendMailforgotPassword
);

router.post(
    "reset-password",
    Middlewares.Auth.decodeEmailfromJWT,
    Controllers.Auth.resetPassword
);

export default router;
