import { inject, injectable } from "tsyringe";

import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

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
    private postsRepository: IPostsRepository
  ) {}

  public async execute({
    user_id,
    category_id,
    description,
    title,
  }: IRequest): Promise<Post> {
    return this.postsRepository.create({
      user_id,
      category_id,
      description,
      title,
    });
  }
}

export { CreatePostUseCase };
