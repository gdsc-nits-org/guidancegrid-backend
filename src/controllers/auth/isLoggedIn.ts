import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

export const isLoggedIn: Interfaces.Controllers.Async = async (_req, res) => {
    return res.json(Utils.Response.success("User already loggedin", 201));
};
