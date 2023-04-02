import { Response, Request } from "express";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";

export default class RenameGeniallyController {
  constructor(private readonly renameGeniallyService: RenameGeniallyService) {}

  public async renameGenially(req: Request, res: Response) {
    const geniallyId = req.params.geniallyId;
    const name = req.body.name;
    try {
      await this.renameGeniallyService.execute(geniallyId, name);
      res.status(204).send();
    } catch (e) {
      const statusCode = e.statusCode | 400;
      res.status(statusCode).send({ error: e.message });
    }
  }
}
