import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("List Categories", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to list all categories", async () => {
    const category1 = {
      name: "string 1",
    };
    const category2 = {
      name: "string 1",
    };

    await categoriesRepositoryInMemory.create(category1);
    await categoriesRepositoryInMemory.create(category2);

    const categories = await listCategoriesUseCase.execute();

    expect(categories.length).toEqual(2);
  });
});
