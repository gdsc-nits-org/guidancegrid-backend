import env from "config";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

export const sendMailforgotPassword: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    const { email } = req.body;
    const JwtExpiresIn = 60 * 60 * 0.5; // 30 minutes
    const token = Utils.Auth.security.generateJWTtoken(email, JwtExpiresIn);
    let resetLink;
    if (env.NODE_ENV === "dev") {
        resetLink = `http://localhost:3000/reset-password?token=${token}`;
    } else if (env.NODE_ENV === "prod") {
        resetLink = `${env.GUIDANCE_GRID_CLIENT_URI}/reset-password?token=${token}`;
    }
    try {
        await Utils.Email.sendMail({
            subject: "Guidance Grid: Password Reset Request",
            body: `
            <html>
            <head></head>
            <body>
              <p>
                Dear User,
              </p>
              <p>
                We received a request to reset your password for your Guidance Grid account. To proceed with the password reset process, please follow the instructions below:
              </p>
              <ol>
                <li>Click on the Password Reset Link: <a href="${resetLink}">${resetLink}</a></li>
                <li>Click on the(Production) Password Reset Link: <a href="https://${env.GUIDANCE_GRID_CLIENT_URI}/reset-password?token=${token}">Click Here</a></li>
                <li>Verify Your Identity: You may be required to provide additional information to verify your identity. This step is crucial to ensuring the security of your account.</li>
                <li>Set a New Password: Once your identity is confirmed, you will be prompted to set a new password for your account. Please choose a strong and secure password.</li>
              </ol>
              <p>
                If you did not initiate this password reset request or believe it to be in error, please ignore this email. Your current password will remain unchanged.
              </p>
              <p>
                This link will expire in 30 minutes, so please make sure to complete the process promptly.
              </p>
              <p>
                Thank you for using Guidance Grid. If you have any questions or need further assistance, feel free to contact our support team at Jaydeep Das<jdeepd.dev@gmail.com>, Jugya K Gogoi <crjugya123@gmail.com>, Priyabrat Duarah<prybrt06@gmail.com>.
              </p>
              <p>Best regards,<br/>Guidance Grid Team</p>
            </body>
            </html>
            `,
            toaddress: email,
        });
        return res.json(
            Utils.Response.success("Password reset link sent to email")
        );
    } catch (e) {
        return next(e);
    }
};
