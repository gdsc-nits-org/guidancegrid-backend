import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const updateProfile: Interfaces.Controllers.Async = async (req, res, next) => {
    try {
        const username = req.body.username;
        const {
            newUsername,
            bio,
            imgURL,
            githubURL,
            facebookURL,
            linkedinURL,
            portfolioURL,
            instaURL,
        } = req.body;
        if (!username) {
            return next(Utils.Response.error("Username not found", 404));
        }
        const user = await Utils.prisma.user.update({
            where: {
                username,
            },
            data: {
                username: newUsername || undefined,
                bio: bio || undefined,
                imgURL: imgURL || undefined,
                Social: {
                    update: {
                        githubURL: githubURL || undefined,
                        facebookURL: facebookURL || undefined,
                        linkedinURL: linkedinURL || undefined,
                        portfolioURL: portfolioURL || undefined,
                        instaURL: instaURL || undefined,
                    },
                },
            },
            include: {
                Social: true,
            },
        });

        if (newUsername) {
            const payload = {
                username: user.username,
                jwtTokenVersion: user.jwtTokenVersion,
            };

            const token = Utils.Auth.security.generateJWTtoken(
                payload,
                30 * 24 * 60 * 60
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.cookie("username", user.username, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
        }

        const userWithoutPassword = Utils.exclude(user, [
            "password",
            "jwtTokenVersion",
        ] as Array<keyof typeof user>);

        return res.json(Utils.Response.success(userWithoutPassword, 200));
    } catch (error) {
        console.log(error);
        return next(
            Utils.Response.error("Error in updateProfile Controller", 500)
        );
    }
};

export { updateProfile };
