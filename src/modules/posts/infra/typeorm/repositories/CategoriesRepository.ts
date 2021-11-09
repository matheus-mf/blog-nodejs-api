import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/posts/dtos/ICreateCategoryDTO";
import { Category } from "@modules/posts/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/posts/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async listAll(): Promise<Category[]> {
    return this.repository.find();
  }

  public async create({ name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
    });
    await this.repository.save(category);
  }

  public async findByName(name: string): Promise<Category> {
    return this.repository.findOne({
      where: { name },
    });
  }

  public async findById(id: string): Promise<Category> {
    return this.repository.findOne(id);
  }
}

export { CategoriesRepository };
