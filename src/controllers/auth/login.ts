import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const login: Interfaces.Middlewares.Async = async (req, res, next) => {
    try {
        const validatedBody = loginSchema.parse(req.body);
        const { email, password } = validatedBody;

        const user = await Utils.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return next(Utils.Response.error("User not exist", 404));
        }

        const salt = user.password.split("$")[1];

        const isPasswordValid =
            user.password === Utils.Auth.security.hashPassword(password, salt);
        if (isPasswordValid) {
            const payload = {
                username: user.username,
                jwtTokenVersion: user.jwtTokenVersion,
            };
            const token = Utils.Auth.security.generateJWTtoken(
                payload,
                30 * 24 * 60 * 60
            );
            res.cookie("token", token);

            return res.json(Utils.Response.success("Loggedin Successfully"));
        } else {
            return next(Utils.Response.error("Invalid password", 401));
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMsg = JSON.parse(error.message)[0].message;
            return next(Utils.Response.error(errorMsg, 401));
        }
        console.log(error);
        return res.json(
            Utils.Response.error("Error in decodeEmailfromJWT Middleware", 401)
        );
    }
};
