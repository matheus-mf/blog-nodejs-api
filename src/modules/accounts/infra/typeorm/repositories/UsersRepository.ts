import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async listAll(): Promise<Array<User>> {
    return this.repository.find();
  }
}

export { UsersRepository };
