import { prisma } from "src/utils";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Errors from "../../globals/errors";
import { z } from "zod";

const verifyEmailBody = z.object({
    email: z.string().email(),
});

export const checkIfEmailExists: Interfaces.Middlewares.Async = async (
    req,
    _res,
    next
) => {
    try {
        const validatedEmail = verifyEmailBody.parse(req.body);
        const user = await prisma.user.findUnique({
            where: {
                email: validatedEmail.email,
            },
        });
        if (!user) {
            return next();
        }
        return next(Errors.Auth.emailAlreadyExists);
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            const errorMsg = JSON.parse(error.message)[0].message;
            return next(Utils.Response.error(errorMsg, 400));
        }
        return next(Utils.Response.error("Error in Middleware", 500));
    }
};
