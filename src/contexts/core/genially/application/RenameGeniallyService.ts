import GeniallyName from "../domain/GeniallyName";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class RenameGeniallyService {
  constructor(private readonly repository: GeniallyRepository) {}

  public async execute(geniallyId: string, name: string): Promise<void> {
    const geniallyToUpdate = await this.repository.find(geniallyId);

    if (!geniallyToUpdate) {
      throw new GeniallyNotExist(geniallyId);
    }

    const geniallyName = new GeniallyName(name);
    geniallyToUpdate.modify(geniallyName);
    this.repository.save(geniallyToUpdate);
  }
}
