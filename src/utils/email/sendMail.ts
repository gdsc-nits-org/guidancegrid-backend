import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient";
import { z } from "zod";

const sendEmailCommandParams = z.object({
    toaddress: z.string().email(),
    fromaddress: z.string().email(),
    subject: z.string(),
    body: z.string(),
});

const sendMailParams = z.object({
    toaddress: z.string().email(),
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

const sendMail = async ({
    subject,
    body,
    toaddress,
}: z.infer<typeof sendMailParams>) => {
    const emailOptions = {
        toaddress,
        fromaddress: "guidancegrid@gmail.com",
        body,
        subject,
    };
    const sendEmailCommand = createSendEmailCommand(emailOptions);
    await sesClient.send(sendEmailCommand);
};

export { sendMail };
