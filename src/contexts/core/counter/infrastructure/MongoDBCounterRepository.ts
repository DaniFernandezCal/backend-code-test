import SharedMongoClient from "../../shared/infrastructure/SharedMongoClient";
import { Counter, CounterDTO } from "../domain/Counter";
import { CounterRepository } from "../domain/CounterRepository";

export default class MongoDBCounterRepository implements CounterRepository {
  private static readonly COLLECTION = "counter";

  constructor(private readonly mongoClient: SharedMongoClient) {}

  async save(counter: Counter): Promise<void> {
    await this.mongoClient
      .db()
      .collection(MongoDBCounterRepository.COLLECTION)
      .updateOne(
        { id: Counter.ID },
        { $set: counter.asDTO() },
        { upsert: true }
      );
  }

  async find(id: string): Promise<Counter> {
    const counter = await this.mongoClient
      .db()
      .collection(MongoDBCounterRepository.COLLECTION)
      .findOne({ id });
    if (counter) {
      return Counter.fromDTO(counter as unknown as CounterDTO);
    }
    return undefined;
  }

  public static getCollection(): string {
    return MongoDBCounterRepository.COLLECTION;
  }
}
