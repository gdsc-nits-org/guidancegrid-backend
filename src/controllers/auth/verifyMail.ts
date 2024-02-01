import env from "config";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

export const verifyMail: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    try {
        const token = Utils.Auth.signUp.genMailToken(req.body.email);
        let verificationLink;
        if (env.NODE_ENV === "dev") {
            verificationLink = `http://localhost:3000/create-user?token=${token}`;
        } else if (env.NODE_ENV === "prod") {
            verificationLink = `${env.GUIDANCE_GRID_CLIENT_URI}/create-user?token=${token}`;
        }
        await Utils.Email.sendMail({
            subject: "Verify Email Address: Guidance Grid",
            body: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                }
                p {
                  color: #666;
                }
                a {
                  color: #007BFF;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Verify Email ID for Guidance Grid</h1>
                <p>Someone wants to create an account on Guidance Grid using this email address (Hopefully it is you).</p>
                <p>Click here to verify your mail.</p>
                <p><a href="${verificationLink}">Verify Mail</a></p>
                <p>Or paste this link directly in your browser:</p>
                <p> ${verificationLink}</p>
                <p>If you didn't request this, you can safely ignore this email.</p>

                <p>Best regards,<br>Guidance Grid Team</p>
              </div>
            </body>
            </html>
            `,
            toaddress: req.body.email,
        });
        return res.json(Utils.Response.success("Mail Sent"));
    } catch (error) {
        return next(error);
    }
};
