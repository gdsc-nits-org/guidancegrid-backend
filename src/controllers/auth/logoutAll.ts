import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

export const logoutAll: Interfaces.Middlewares.Async = async (
    req,
    res,
    next
) => {
    try {
        const username = req.body.username;

        await Utils.prisma.user.update({
            where: {
                username,
            },
            data: {
                jwtTokenVersion: {
                    increment: 1,
                },
            },
        });

        return res.json(Utils.Response.success("Logged out from all devices"));
    } catch (error) {
        console.log(error);
        return next(Utils.Response.error("Error in logoutAll Middleware", 401));
    }
};
