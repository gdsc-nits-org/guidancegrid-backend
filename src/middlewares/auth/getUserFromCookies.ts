import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import { z } from "zod";

const userSchema = z.object({
    username: z.string(),
    jwtTokenVersion: z.number(),
});

export const getUserFromCookies: Interfaces.Middlewares.Async = async (
    req,
    _res,
    next
) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return next(Utils.Response.error("No token found", 404));
        }
        const userPayload = Utils.Auth.security.verifyJWT(token);
        const validatedUserPayload = userSchema.parse(userPayload);

        const user = await Utils.prisma.user.findUnique({
            where: {
                username: validatedUserPayload.username,
            },
        });

        if (!user) {
            return next(Utils.Response.error("User not found", 404));
        }

        req.body.username = validatedUserPayload.username;
        return next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return next(Utils.Response.error(error.errors[0].message, 401));
        }
        console.log(error);
        return next(
            Utils.Response.error("Error in getUserFromCookies Middleware", 401)
        );
    }
};
