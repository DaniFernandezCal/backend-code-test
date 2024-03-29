import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class DeleteGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(geniallyId: string): Promise<void> {
    const genially = await this.repository.find(geniallyId);
    if (!genially) {
      throw new GeniallyNotExist(geniallyId);
    }

    genially.delete();

    await this.repository.save(genially);
  }
}
