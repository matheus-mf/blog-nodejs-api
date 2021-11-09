import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { DeletePostController } from "@modules/posts/useCases/deletePost/DeletePostController";
import { ListPostsController } from "@modules/posts/useCases/listPosts/ListPostsController";
import { UpdatePostController } from "@modules/posts/useCases/updatePost/UpdatePostController";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const listPostsController = new ListPostsController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

postsRoutes.post("/", createPostController.handle);
postsRoutes.get("/", listPostsController.handle);
postsRoutes.put("/:id", updatePostController.handle);
postsRoutes.delete("/:id", deletePostController.handle);

export default postsRoutes;
