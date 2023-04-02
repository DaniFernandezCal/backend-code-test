import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import CreateGeniallyController from "./controllers/createGeniallyController";
import CreateGeniallyService from "../../src/contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyController from "./controllers/deleteGeniallyController";
import InMemoryGeniallyRepository from "../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import DeleteGeniallyService from "../../src/contexts/core/genially/application/DeleteGeniallyService";

const geniallyRepository = new InMemoryGeniallyRepository();
const createGeniallyService = new CreateGeniallyService(geniallyRepository);
const createGeniallyController = new CreateGeniallyController(
  createGeniallyService
);
const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
const deleteGeniallyController = new DeleteGeniallyController(
  deleteGeniallyService
);

// Create Express server
const app = express();

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

export default app;
