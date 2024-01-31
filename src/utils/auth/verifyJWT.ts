import jwt from "jsonwebtoken";
import env from "config";

export const verifyJWT = (token: string) => {
    const decoded = jwt.verify(token, env.JWT_SIGNING_KEY);
    return decoded;
};
