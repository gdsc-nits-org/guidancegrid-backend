import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1),
    body: z.string().min(1),
});

export const createPost: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    try {
        const postDetails = createPostSchema.parse(req.body);
        const { title, body } = postDetails;

        const user = await Utils.prisma.user.findFirst({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            return next(Utils.Response.error("User not found", 404));
        }

        const post = await Utils.prisma.post.create({
            data: {
                authorID: user?.uid,
                title: title,
                body: body,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        return next(Utils.Response.error("Error in creating post", 500));
    }
};
