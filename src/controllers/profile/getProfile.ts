import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

//Exclude function to exclude keys from object

const getProfile: Interfaces.Controllers.Async = async (req, res, next) => {
    try {
        const username = req.body.username;
        if (!username) {
            return next(Utils.Response.error("Username not found", 404));
        }
        const user = await Utils.prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                Social: true,
            },
        });

        const userWithoutPassword = Utils.exclude(user, [
            "password",
            "jwtTokenVersion",
        ] as Array<keyof typeof user>);

        return res.json(Utils.Response.success(userWithoutPassword, 200));
    } catch (error) {
        console.log(error);
        return next(
            Utils.Response.error("Error in getProfile Controller", 500)
        );
    }
};

export { getProfile };
