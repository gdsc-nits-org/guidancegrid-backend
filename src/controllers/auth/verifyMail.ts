import { z } from "zod";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const verifyEmailBody = z.object({
    email: z.string().email(),
});

export const verifyMail: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    try {
        const validatedEmail = verifyEmailBody.parse(req.body);
        const token = Utils.Auth.signUp.genMailToken(validatedEmail.email);
        await Utils.Email.sendMail({
            subject: "Verify Email Address: Guidance Grid",
            body: `
                <b>
                    Click on this link to verify email address: <a href="http://localhost:3000/create-user?token=${token}">Verify Email</a>
                </b>
            `,
            toaddress: validatedEmail.email,
        });
        return res.json(Utils.Response.success(token));
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMsg = JSON.parse(error.message)[0].message;
            return next(Utils.Response.error(errorMsg, 401));
        }
        return next(error);
    }
};
