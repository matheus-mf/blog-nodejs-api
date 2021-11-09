import { inject, injectable } from "tsyringe";

import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

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
    private postsRepository: IPostsRepository
  ) {}

  public async execute({
    id,
    description,
    title,
    category_id,
    user_id,
  }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id);

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
