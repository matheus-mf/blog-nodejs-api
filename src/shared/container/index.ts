import { container } from "tsyringe";

import { CategoriesRepository } from "@modules/posts/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
