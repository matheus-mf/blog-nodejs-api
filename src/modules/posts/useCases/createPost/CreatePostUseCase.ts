import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  category_id: string;
  description: string;
  title: string;
}

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({
    user_id,
    category_id,
    description,
    title,
  }: IRequest): Promise<Post> {
    const userDoesNotExist = await this.usersRepository.findById(user_id);

    if (!userDoesNotExist) {
      throw new AppError("User does not exist!");
    }

    const categoryDoesNotExist = await this.categoriesRepository.findById(
      category_id
    );

    if (!categoryDoesNotExist) {
      throw new AppError("Category does not exist!");
    }

    return this.postsRepository.create({
      user_id,
      category_id,
      description,
      title,
    });
  }
}

export { CreatePostUseCase };
