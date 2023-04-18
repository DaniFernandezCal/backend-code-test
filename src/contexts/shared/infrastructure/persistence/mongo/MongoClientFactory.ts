import { MongoClient } from "mongodb";
import { MongoConfig } from "./MongoConfig";

export class MongoClientFactory {
  private static clients: { [key: string]: MongoClient } = {};

  static async createClient(
    contextName: string,
    config: MongoConfig
  ): Promise<MongoClient> {
    let client = MongoClientFactory.getclient(contextName);

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(config);

      MongoClientFactory.registerClient(contextName, client);
    }

    return client;
  }

  private static async createAndConnectClient(
    config: MongoConfig
  ): Promise<MongoClient> {
    const client = new MongoClient(config.url);

    await client.connect();

    return client;
  }

  private static getclient(contextName: string) {
    return MongoClientFactory.clients[contextName];
  }

  private static registerClient(
    contextName: string,
    client: MongoClient
  ): void {
    MongoClientFactory.clients[contextName] = client;
  }
}
