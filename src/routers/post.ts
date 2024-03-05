import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

router.get(
    "/get-all-post",
    Middlewares.Auth.protect,
    Controllers.Post.getAllPost
);

router.get(
    "/get-single-post/:id",
    Middlewares.Auth.protect,
    Controllers.Post.getPostById
);

router.post(
    "/create-post",
    Middlewares.Auth.protect,
    Controllers.Post.createPost
);

export default router;
