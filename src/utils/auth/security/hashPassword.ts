import * as crypto from "node:crypto";

/* For Login, provide the salt as argument to the function */

export const hashPassword = (password: string, salt: string | null = null) => {
    salt = salt ?? crypto.randomBytes(16).toString("hex");
    const hash =
        crypto.scryptSync(password, salt, 64).toString("hex") + "$" + salt;
    return hash;
};
