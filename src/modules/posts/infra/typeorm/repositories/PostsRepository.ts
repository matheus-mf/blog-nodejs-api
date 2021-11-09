import { getRepository, Repository } from "typeorm";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  public async create({
    description,
    title,
    category_id,
    user_id,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      description,
      title,
      category_id,
      user_id,
    });

    await this.repository.save(post);

    return post;
  }

  public async listAll(): Promise<Array<Post>> {
    return this.repository.find({ relations: ["category", "autor"] });
  }
}

export { PostsRepository };
