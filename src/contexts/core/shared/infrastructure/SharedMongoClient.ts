import { MongoClient, Db } from "mongodb";
import * as dotenv from "dotenv";
import MongoConfigProvider from "./ConfigProvider";

dotenv.config();

export default class SharedMongoClient {
  private constructor(private readonly _db: Db) {}

  public static of(): SharedMongoClient {
    const mongoConfig = new MongoConfigProvider().config();
    const connectionString = `mongodb://${mongoConfig.mongoUrl}:${mongoConfig.port}/${mongoConfig.database}`;
    const mongoClient = new MongoClient(connectionString);
    const db = mongoClient.db();
    return new SharedMongoClient(db);
  }

  public db(): Db {
    return this._db;
  }

  public async dropCollection(collection: string): Promise<void> {
    await this._db.dropCollection(collection);
  }
}
