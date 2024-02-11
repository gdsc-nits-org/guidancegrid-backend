import * as Utils from "../../utils";

const emailAlreadyExists = Utils.Response.error("Email Already Exists", 401);

const usernameAlreadyExists = Utils.Response.error(
    "Username Already Exists",
    401
);

export { emailAlreadyExists, usernameAlreadyExists };
