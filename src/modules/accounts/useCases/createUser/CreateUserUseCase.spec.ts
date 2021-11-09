import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new users with email exists", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
    });

    await expect(
      createUserUseCase.execute({
        name: "John Doe",
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
