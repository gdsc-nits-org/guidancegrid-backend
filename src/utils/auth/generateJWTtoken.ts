import jwt from "jsonwebtoken";
import env from "config";

export const generateJWTtoken = (payload: any, expiration: number) => {
    return jwt.sign(payload, env.JWT_SIGNING_KEY, { expiresIn: expiration });
};
