import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({ name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists!");
    }

    await this.categoriesRepository.create({
      name,
    });
  }
}

export { CreateCategoryUseCase };
