import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/posts/repositories/in-memory/CategoriesRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PotsRepositoryInMemory";

import { CreatePostUseCase } from "./CreatePostUseCase";

let postsRepositoryInMemory: PostsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createPostUseCase: CreatePostUseCase;

describe("Create Post", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    postsRepositoryInMemory = new PostsRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
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
});
