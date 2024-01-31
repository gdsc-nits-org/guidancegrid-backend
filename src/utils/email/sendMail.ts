import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient";
// import env from "config";

interface SendEmailCommandParams {
    toaddress: string;
    fromaddress: string;
    subject: string;
    body: string;
}

const createSendEmailCommand = (emailParams: SendEmailCommandParams) => {
    const params = {
        Destination: {
            ToAddresses: [emailParams.toaddress],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "<h1>OTP from Guidance Grid</h1>",
                },
                Text: {
                    Charset: "UTF-8",
                    Data: emailParams.body,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: emailParams.subject,
            },
        },
        Source: emailParams.fromaddress,
    };
    return new SendEmailCommand(params);
};

const sendMail = async () => {
    const emailOptions: SendEmailCommandParams = {
        toaddress: "jaydeepjd.8914@gmail.com",
        fromaddress: "guidancegrid@gmail.com",
        body: "Hello from Guidance Grid. Your OTP is 923445",
        subject: "OTP from Guidance Grid",
    };
    const sendEmailCommand = createSendEmailCommand(emailOptions);
    try {
        return sesClient.send(sendEmailCommand);
    } catch (e) {
        console.log("Failed", e);
    }
};

export { sendMail };
