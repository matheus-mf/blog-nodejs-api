import { v4 as uuidV4 } from "uuid";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";

import { IPostsRepository } from "../IPostsRepository";

class PostsRepositoryInMemory implements IPostsRepository {
  private posts: Post[] = [];

  async create({
    description,
    category_id,
    title,
    user_id,
  }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, {
      id: uuidV4(),
      description,
      category_id,
      title,
      user_id,
    });

    this.posts.push(post);

    return post;
  }

  async listAll(): Promise<Array<Post>> {
    return this.posts;
  }

  async findById(id: string): Promise<Post> {
    return this.posts.find((post) => post.id === id);
  }

  async save(post: Post): Promise<Post> {
    const findIndex = this.posts.findIndex(
      (findPost) => findPost.id === post.id
    );

    this.posts[findIndex] = post;

    return post;
  }
}

export { PostsRepositoryInMemory };
