import { inject, injectable } from "tsyringe";

import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post does not exist!", 404);
    }

    await this.postsRepository.delete(id);
  }
}

export { DeletePostUseCase };
