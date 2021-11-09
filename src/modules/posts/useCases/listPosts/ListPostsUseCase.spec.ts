import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PotsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { ListPostsUseCase } from "./ListPostsUseCase";

let postsRepositoryInMemory: PostsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let listPostsUseCase: ListPostsUseCase;

describe("List Posts", () => {
  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    listPostsUseCase = new ListPostsUseCase(postsRepositoryInMemory);
  });

  it("should be able to list all posts", async () => {
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

    await postsRepositoryInMemory.create({
      user_id: autor.id,
      category_id: categoryCreated.id,
      description: "description",
      title: "title",
    });

    const posts = await listPostsUseCase.execute();

    expect(posts.length).toEqual(1);
  });
});
