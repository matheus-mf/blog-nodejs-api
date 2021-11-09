import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email }: ICreateUserDTO): Promise<User> {
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError("User already exists");
    }

    return this.usersRepository.create({
      name,
      email,
    });
  }
}

export { CreateUserUseCase };
