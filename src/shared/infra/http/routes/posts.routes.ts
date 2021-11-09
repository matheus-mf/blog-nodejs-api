import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";

const postsRoutes = Router();

const createPostController = new CreatePostController();

postsRoutes.post("/", createPostController.handle);

export default postsRoutes;
