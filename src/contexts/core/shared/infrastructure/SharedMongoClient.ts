import { MongoClient, Db } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export default class SharedMongoClient {
  private constructor(private readonly mongoClient: MongoClient) {}

  public static of(): SharedMongoClient {
    const mongoURL = process.env.MONGODB_URL;
    const port = process.env.MONGODB_PORT;
    const database = process.env.MONGODB_DATABASE;
    const connectionString = `mongodb://${mongoURL}:${port}/${database}`;
    const mongoClient = new MongoClient(connectionString);
    return new SharedMongoClient(mongoClient);
  }

  public db(): Db {
    return this.mongoClient.db();
  }
}
