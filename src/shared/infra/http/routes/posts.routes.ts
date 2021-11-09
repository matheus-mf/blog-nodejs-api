import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { ListPostsController } from "@modules/posts/useCases/listPosts/ListPostsController";
import { UpdatePostController } from "@modules/posts/useCases/updatePost/UpdatePostController";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const listPostsController = new ListPostsController();
const updatePostController = new UpdatePostController();

postsRoutes.post("/", createPostController.handle);
postsRoutes.get("/", listPostsController.handle);
postsRoutes.put("/:id", updatePostController.handle);

export default postsRoutes;
