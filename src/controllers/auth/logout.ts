import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

export const logout: Interfaces.Middlewares.Async = async (_req, res, next) => {
    try {
        res.cookie("token", "");
        return res.json(Utils.Response.success("Logged out successfully"));
    } catch (error) {
        console.log(error);
        return next(Utils.Response.error("Error in logoutAll Middleware", 401));
    }
};
