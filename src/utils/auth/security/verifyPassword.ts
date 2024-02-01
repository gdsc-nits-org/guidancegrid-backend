import { hashPassword } from "./hashPassword";

export const verifyPassword = (
    hashed: string,
    plaintext: string,
    salt: string
): boolean => {
    const hashedPlaintext = hashPassword(plaintext, salt);
    return hashed + "$" + salt === hashedPlaintext;
};
