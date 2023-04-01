import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyDescription from "../domain/GeniallyDescription";
import GeniallyName from "../domain/GeniallyName";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;

    const geniallyName = new GeniallyName(name);
    const geniallyDescription = new GeniallyDescription(description);

    const genially = new Genially(id, geniallyName, geniallyDescription);

    await this.repository.save(genially);

    return genially;
  }
}
