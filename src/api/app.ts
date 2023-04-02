import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import CreateGeniallyController from "./controllers/createGeniallyController";
import CreateGeniallyService from "../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyController from "./controllers/deleteGeniallyController";
import DeleteGeniallyService from "../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../contexts/core/genially/application/RenameGeniallyService";
import RenameGeniallyController from "./controllers/renameGeniallyController";
import SharedMongoClient from "..//contexts/core/shared/infrastructure/SharedMongoClient";
import MongoDBGeniallyRepository from "../contexts/core/genially/infrastructure/MongoDBGeniallyRepository";

const app = express();

const sharedMongoClient = SharedMongoClient.of();
const geniallyRepository = new MongoDBGeniallyRepository(sharedMongoClient);
const createGeniallyService = new CreateGeniallyService(geniallyRepository);
const createGeniallyController = new CreateGeniallyController(
  createGeniallyService
);
const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
const deleteGeniallyController = new DeleteGeniallyController(
  deleteGeniallyService
);
const renameGeniallyService = new RenameGeniallyService(geniallyRepository);
const renameGeniallyController = new RenameGeniallyController(
  renameGeniallyService
);

// Create Express server

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// Primary app routes
app.get("/", healthController.check);
app.post(
  "/genially",
  createGeniallyController.createGenially.bind(createGeniallyController)
);
app.delete(
  "/genially/:geniallyId",
  deleteGeniallyController.deleteGenially.bind(deleteGeniallyController)
);
app.patch(
  "/genially/:geniallyId",
  renameGeniallyController.renameGenially.bind(renameGeniallyController)
);

export default app;
