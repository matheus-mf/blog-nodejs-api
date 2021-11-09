import { ICreateCategoryDTO } from "@modules/posts/dtos/ICreateCategoryDTO";

import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  findById(id: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };
