import { Response, Request } from "express";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";

const geniallyRepository = new InMemoryGeniallyRepository();
const createGeniallyService = new CreateGeniallyService(geniallyRepository);

export default async (req: Request, res: Response) => {
  const geaniallyData = req.body;
  try {
    await createGeniallyService.execute(geaniallyData);
    res.status(201).send();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
