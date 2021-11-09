import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { ListPostsController } from "@modules/posts/useCases/listPosts/ListPostsController";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const listPostsController = new ListPostsController();

postsRoutes.post("/", createPostController.handle);
postsRoutes.get("/", listPostsController.handle);

export default postsRoutes;
