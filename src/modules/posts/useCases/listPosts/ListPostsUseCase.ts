import { inject, injectable } from "tsyringe";

import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

@injectable()
class ListPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  public async execute(): Promise<Array<Post>> {
    return this.postsRepository.listAll();
  }
}

export { ListPostsUseCase };
