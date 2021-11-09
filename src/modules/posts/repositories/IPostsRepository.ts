import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";

interface IPostsRepository {
  create({
    description,
    title,
    category_id,
    user_id,
  }: ICreatePostDTO): Promise<Post>;
  listAll(): Promise<Array<Post>>;
  findById(id: string): Promise<Post>;
  save(post: Post): Promise<Post>;
}

export { IPostsRepository };
