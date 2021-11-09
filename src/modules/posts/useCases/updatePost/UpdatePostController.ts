import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePostUseCase } from "./UpdatePostUseCase";

class UpdatePostController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user_id, category_id, title, description } = request.body;
    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    const posts = await updatePostUseCase.execute({
      id,
      category_id,
      user_id,
      title,
      description,
    });

    return response.status(200).json(posts);
  }
}

export { UpdatePostController };
