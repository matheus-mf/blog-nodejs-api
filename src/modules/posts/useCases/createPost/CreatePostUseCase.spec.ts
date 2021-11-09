import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PotsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreatePostUseCase } from "./CreatePostUseCase";

let postsRepositoryInMemory: PostsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createPostUseCase: CreatePostUseCase;

describe("Create Post", () => {
  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    createPostUseCase = new CreatePostUseCase(
      postsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it("should be able to create a new post", async () => {
    const category = {
      name: "Category Test",
    };

    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
    };

    await categoriesRepositoryInMemory.create(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    const userCreated = await usersRepositoryInMemory.create(user);

    const postCreated = await createPostUseCase.execute({
      user_id: userCreated.id,
      category_id: categoryCreated.id,
      description: "description",
      title: "title",
    });

    expect(postCreated).toHaveProperty("id");
  });

  it("should not be able to create a new post when user does not exist", async () => {
    const category = {
      name: "Category Test",
    };

    await categoriesRepositoryInMemory.create(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    await expect(
      createPostUseCase.execute({
        user_id: "user-not-exist",
        category_id: categoryCreated.id,
        description: "description",
        title: "title",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
