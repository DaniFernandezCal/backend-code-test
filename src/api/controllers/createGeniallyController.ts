import { Response, Request } from "express";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";

export default class CreateGeniallyController {
  constructor(private readonly createGeniallyService: CreateGeniallyService) {}

  public async createGenially(req: Request, res: Response) {
    const geaniallyData = req.body;
    try {
      await this.createGeniallyService.execute(geaniallyData);
      res.status(201).send();
    } catch (e) {
      const statusCode = e.statusCode || 500;
      res.status(statusCode).send({ error: e.message });
    }
  }
}
