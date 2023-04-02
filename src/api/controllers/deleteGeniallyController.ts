import { Response, Request } from "express";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";

const geniallyRepository = new InMemoryGeniallyRepository();
const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);

export default async (req: Request, res: Response) => {
  const geniallyId = req.params.id;
  try {
    await deleteGeniallyService.execute(geniallyId);
    res.status(204).send();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
