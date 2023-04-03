export interface MongoConfig {
  mongoUrl: string;
  port: number;
  database: string;
}

export default class MongoConfigProvider {
  private _config: MongoConfig;

  constructor() {
    const config = {
      mongoUrl: process.env.MONGODB_URL,
      port: process.env.MONGODB_PORT,
      database: process.env.MONGODB_DATABASE,
    } as unknown as MongoConfig;
    this._config = config;
  }

  public config(): MongoConfig {
    return this._config;
  }
}
