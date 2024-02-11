import * as Utils from "../../utils";

const emailAlreadyExists = Utils.Response.error("Email Already Exists", 409);

const usernameAlreadyExists = Utils.Response.error(
    "Username Already Exists",
    409
);

export { emailAlreadyExists, usernameAlreadyExists };
