import { generateJWTtoken } from "../security/generateJWTtoken";
import { z } from "zod";

export const emailPayload = z.object({
    email: z.string().email(),
});

export const genMailToken = (email: string) => {
    const payload = {
        email,
    };
    const validatedEmailPayload = emailPayload.parse(payload);
    /* Token expires in 30 mins */
    const token = generateJWTtoken(validatedEmailPayload, 60 * 60 * 0.5);
    return token;
};
