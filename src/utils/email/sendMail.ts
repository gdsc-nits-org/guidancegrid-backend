import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient";
import { z } from "zod";

const sendEmailCommandParams = z.object({
    toaddress: z.string().email(),
    fromaddress: z.string().email(),
    subject: z.string(),
    body: z.string(),
});

const createSendEmailCommand = (
    emailParams: z.infer<typeof sendEmailCommandParams>
) => {
    const validatedEmailParams = sendEmailCommandParams.parse(emailParams);
    const params = {
        Destination: {
            ToAddresses: [validatedEmailParams.toaddress],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "<h1>OTP from Guidance Grid</h1>",
                },
                Text: {
                    Charset: "UTF-8",
                    Data: validatedEmailParams.body,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: validatedEmailParams.subject,
            },
        },
        Source: validatedEmailParams.fromaddress,
    };
    return new SendEmailCommand(params);
};

const sendMail = async () => {
    console.log("Sending email...");
    const emailOptions = {
        toaddress: "jaydeepjd.8914@gmail.com",
        fromaddress: "guidancegrid@gmail.com",
        body: "Hello from Guidance Grid. Your OTP is 923445",
        subject: "OTP from Guidance Grid",
    };
    console.log("Creating Send Email Command");
    const sendEmailCommand = createSendEmailCommand(emailOptions);
    console.log("inal");
    await sesClient.send(sendEmailCommand);
};

export { sendMail };
