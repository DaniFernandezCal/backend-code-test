import { Uuid } from "../../shared/domain/Uuid";
import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: Uuid): Promise<Genially> {
    return this.geniallys.find((genially) => genially.id.value === id.value);
  }

  async delete(id: Uuid): Promise<void> {
    this.geniallys = this.geniallys.filter(
      (genially) => genially.id.value !== id.value
    );
  }
}
