import { z } from "zod";
import { prisma } from "../../utils";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const createUserBody = z.object({
    email: z.string().email(),
    username: z.string().min(1).max(64),
    password: z.string().min(8).max(64),
    firstName: z.string().min(1).max(64),
    lastName: z.string().min(1).max(64),
});

export const createUser: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    try {
        const validatedCreateUserBody = createUserBody.parse(req.body);
        const hashedPassword = Utils.Auth.security.hashPassword(
            validatedCreateUserBody.password
        );
        const user = await prisma.user.create({
            data: {
                email: validatedCreateUserBody.email,
                username: validatedCreateUserBody.username,
                password: hashedPassword,
                firstName: validatedCreateUserBody.firstName,
                lastName: validatedCreateUserBody.lastName,
            },
        });
        return res.json(Utils.Response.success(user));
    } catch (error) {
        console.log(error);
        return next(
            Utils.Response.error("Error in createUser Controller", 500)
        );
    }
};
