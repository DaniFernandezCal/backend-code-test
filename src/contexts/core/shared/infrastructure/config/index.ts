import convict from "convict";

const coreConfig = convict({
  env: {
    doc: "Application environment",
    format: ["pro", "dev", "stage", "test"],
    default: "default",
    env: "NODE_ENV",
  },
  mongo: {
    url: {
      doc: "Mongo connection url",
      format: String,
      env: "MONGO_URL",
      default: "mongodb://localhost:27017/genially-backend-dev",
    },
  },
});

coreConfig.loadFile([
  __dirname + "/deafult.json",
  __dirname + "/" + coreConfig.get("env") + ".json",
]);

export default coreConfig;
