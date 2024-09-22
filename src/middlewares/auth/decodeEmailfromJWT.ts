import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

export const decodeEmailfromJWT: Interfaces.Middlewares.Async = async (
    req,
    res,
    next
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("JWT Token not found");
        }
        const emailPayload = Utils.Auth.security.verifyJWT(token);
        console.log("data ", emailPayload);
        const validatedEmailPayload =
            Utils.Auth.signUp.emailPayload.parse(emailPayload);
        req.body.email = validatedEmailPayload.email;
        return next();
    } catch (error) {
        console.log(error);
        return res.json(Utils.Response.error(`${error}`, 401));
    }
};
