import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PotsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { UpdatePostUseCase } from "./UpdatePostUseCase";

let postsRepositoryInMemory: PostsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let updatePostUseCase: UpdatePostUseCase;

describe("Update Post", () => {
  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    updatePostUseCase = new UpdatePostUseCase(
      postsRepositoryInMemory,
      usersRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it("should be able update a post", async () => {
    const user = {
      name: "string",
      email: "user@example.com",
    };

    const autor = await usersRepositoryInMemory.create(user);

    const category = {
      name: "string",
    };

    await categoriesRepositoryInMemory.create(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    const postCreated = await postsRepositoryInMemory.create({
      user_id: autor.id,
      category_id: categoryCreated.id,
      description: "description",
      title: "title",
    });

    const posts = await updatePostUseCase.execute({
      id: postCreated.id,
      title: "update title",
      description: postCreated.description,
      category_id: postCreated.category_id,
      user_id: postCreated.user_id,
    });

    expect(posts.title).toEqual("update title");
  });

  it("should not be able update a post when user does not exist", async () => {
    const user = {
      name: "string",
      email: "user@example.com",
    };

    const autor = await usersRepositoryInMemory.create(user);

    const category = {
      name: "string",
    };

    await categoriesRepositoryInMemory.create(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    const postCreated = await postsRepositoryInMemory.create({
      user_id: autor.id,
      category_id: categoryCreated.id,
      description: "description",
      title: "title",
    });

    await expect(
      updatePostUseCase.execute({
        id: postCreated.id,
        title: "update title",
        description: postCreated.description,
        category_id: postCreated.category_id,
        user_id: "user-not-exist",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update a post when category does not exist", async () => {
    const user = {
      name: "string",
      email: "user@example.com",
    };

    const autor = await usersRepositoryInMemory.create(user);

    const category = {
      name: "string",
    };

    await categoriesRepositoryInMemory.create(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    const postCreated = await postsRepositoryInMemory.create({
      user_id: autor.id,
      category_id: categoryCreated.id,
      description: "description",
      title: "title",
    });

    await expect(
      updatePostUseCase.execute({
        id: postCreated.id,
        title: "update title",
        description: postCreated.description,
        category_id: "category-not-exist",
        user_id: postCreated.user_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a post when the post is not found", async () => {
    const user = {
      name: "string",
      email: "user@example.com",
    };

    const autor = await usersRepositoryInMemory.create(user);

    const category = {
      name: "string",
    };

    await categoriesRepositoryInMemory.create(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    const postCreated = await postsRepositoryInMemory.create({
      user_id: autor.id,
      category_id: categoryCreated.id,
      description: "description",
      title: "title",
    });

    await expect(
      updatePostUseCase.execute({
        id: "post-not-found",
        title: "update title",
        description: postCreated.description,
        category_id: postCreated.category_id,
        user_id: postCreated.user_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
