import * as Utils from "../../utils";

const mailNotUnique = Utils.Response.error("Email Already Exists", 401);

const usernameNotUnique = Utils.Response.error("Username Already Exists", 401);

export { mailNotUnique, usernameNotUnique };
