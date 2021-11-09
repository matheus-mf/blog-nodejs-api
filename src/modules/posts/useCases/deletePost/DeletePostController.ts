import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeletePostUseCase } from "./DeletePostUseCase";

class DeletePostController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    await deletePostUseCase.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeletePostController };
