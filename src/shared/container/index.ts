import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/posts/infra/typeorm/repositories/CategoriesRepository";
import { PostsRepository } from "@modules/posts/infra/typeorm/repositories/PostsRepository";
import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPostsRepository>(
  "PostsRepository",
  PostsRepository
);
