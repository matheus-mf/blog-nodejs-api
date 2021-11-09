import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PotsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { DeletePostUseCase } from "./DeletePostUseCase";

let postsRepositoryInMemory: PostsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let deletePostUseCase: DeletePostUseCase;

describe("Delete Post", () => {
  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    deletePostUseCase = new DeletePostUseCase(postsRepositoryInMemory);
  });

  it("should be able delete a post", async () => {
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

    await deletePostUseCase.execute({
      id: postCreated.id,
    });

    const posts = await postsRepositoryInMemory.listAll();

    expect(posts.length).toEqual(0);
  });

  it("should not be able delete a post when the post is not found", async () => {
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

    await deletePostUseCase.execute({
      id: postCreated.id,
    });

    await expect(
      deletePostUseCase.execute({
        id: postCreated.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
