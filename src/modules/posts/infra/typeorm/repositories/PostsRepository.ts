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

  public async findById(id: string): Promise<Post> {
    return this.repository.findOne(id, { relations: ["category", "autor"] });
  }

  public async save(post: Post): Promise<Post> {
    console.log(post);
    return this.repository.save(post);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PostsRepository };
