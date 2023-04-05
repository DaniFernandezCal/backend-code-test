import { Uuid } from "../../shared/domain/Uuid";
import SharedMongoClient from "../../shared/infrastructure/SharedMongoClient";
import Genially, { GeniallyDTO } from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class MongoDBGeniallyRepository implements GeniallyRepository {
  private static readonly COLLECTION = "genially";

  constructor(private readonly mongoClient: SharedMongoClient) {}

  async save(genially: Genially): Promise<void> {
    await this.mongoClient
      .db()
      .collection(MongoDBGeniallyRepository.COLLECTION)
      .updateOne(
        { id: genially.id },
        { $set: genially.asDTO() },
        { upsert: true }
      );
  }
  async find(id: Uuid): Promise<Genially> {
    const obtainedGenially = await this.mongoClient
      .db()
      .collection(MongoDBGeniallyRepository.COLLECTION)
      .findOne({ id });
    if (obtainedGenially) {
      return Genially.fromDTO(obtainedGenially as unknown as GeniallyDTO);
    }
    return undefined;
  }
  delete(id: Uuid): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
