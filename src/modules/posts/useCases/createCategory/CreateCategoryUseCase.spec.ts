import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});