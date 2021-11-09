import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
  category_id: string;
  description: string;
  title: string;
}

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({
    id,
    description,
    title,
    category_id,
    user_id,
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

    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post does not exist!", 404);
    }

    Object.assign(post, {
      description,
      title,
      category_id,
      user_id,
    });

    return this.postsRepository.save(post);
  }
}

export { UpdatePostUseCase };
