import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePostUseCase } from "./CreatePostUseCase";

class CreatePostController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, category_id, title, description } = request.body;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    await createPostUseCase.execute({
      user_id,
      category_id,
      title,
      description,
    });

    return response.status(201).send();
  }
}

export { CreatePostController };
