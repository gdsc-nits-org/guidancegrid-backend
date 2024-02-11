import { z } from "zod";
import { prisma } from "../../utils";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const resetPasswordBody = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64),
});

export const resetPassword: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    try {
        const validatedResetPasswordBody = resetPasswordBody.parse(req.body);
        const hashedPassword = Utils.Auth.security.hashPassword(
            validatedResetPasswordBody.password
        );
        const user = await prisma.user.update({
            data: {
                password: hashedPassword,
            },
            where: {
                email: validatedResetPasswordBody.email,
            },
        });
        return res.json(Utils.Response.success(user));
    } catch (error) {
        return next(Utils.Response.error("Error in Resetting Password", 500));
    }
};
