import { generateJWTtoken } from "../generateJWTtoken";

export const genMailToken = (email: string) => {
    const payload = {
        email,
    };
    /* Token expires in 30 mins */
    const token = generateJWTtoken(payload, 60 * 60 * 0.5);
    return token;
};
