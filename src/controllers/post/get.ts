import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Constants from "../../globals/constants";
import { z } from "zod";

const pageQuery = z.number();

export const getAllPost: Interfaces.Controllers.Async = async (
    req,
    res,
    next
) => {
    try {
        const page = req.query.page;
        if (!page || typeof page !== "string") {
            return next(Utils.Response.error("Page number is required", 400));
        }
        const validatePage = pageQuery.parse(parseInt(page));

        if (validatePage < 1) {
            return next(Utils.Response.error("Invalid page number", 400));
        }

        const startIndex = (validatePage - 1) * Constants.Post.noOfPosts;

        const post = await Utils.prisma.post.findMany({
            skip: startIndex,
            take: Constants.Post.noOfPosts,
            orderBy: {
                createdAt: "asc",
            },
        });
        return res.json(Utils.Response.success(post));
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMsg = JSON.parse(error.message)[0].message;
            return next(Utils.Response.error(errorMsg, 401));
        }
        console.log(error);
        return next(Utils.Response.error("Error in fetching posts", 500));
    }
};
