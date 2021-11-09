import { inject, injectable } from "tsyringe";

import { Category } from "@modules/posts/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute(): Promise<Array<Category>> {
    return this.categoriesRepository.listAll();
  }
}

export { ListCategoriesUseCase };
