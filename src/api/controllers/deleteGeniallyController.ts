import { Response, Request } from "express";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";

export default class DeleteGeniallyController {
  constructor(private readonly deleteGeniallyService: DeleteGeniallyService) {}

  public async deleteGenially(req: Request, res: Response) {
    const geniallyId = req.params.geniallyId;
    try {
      await this.deleteGeniallyService.execute(geniallyId);
      res.status(204).send();
    } catch (e) {
      const statusCode = e.statusCode || 500;
      res.status(statusCode).send({ error: e.message });
    }
  }
}
