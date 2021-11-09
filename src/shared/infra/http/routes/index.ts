import { Router } from "express";

import categoriesRoutes from "./categories.routes";
import postsRoutes from "./posts.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/posts", postsRoutes);

export default router;
