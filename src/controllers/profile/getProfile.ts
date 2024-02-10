import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const getProfile: Interfaces.Controllers.Async = async (req, res, next) => {
    const username = req.body.username;
    if (!username) {
        return next("No username found");
    }
    return res.json(Utils.Response.success(username, 200));
};

export { getProfile };
