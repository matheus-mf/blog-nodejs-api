import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe("List Users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("should be able to list all users", async () => {
    const user1 = {
      name: "string 1",
      email: "user1@example.com",
    };
    const user2 = {
      name: "string 2",
      email: "user2@example.com",
    };

    await usersRepositoryInMemory.create(user1);
    await usersRepositoryInMemory.create(user2);

    const users = await listUsersUseCase.execute();

    expect(users.length).toEqual(2);
  });
});
