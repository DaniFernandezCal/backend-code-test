import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import app from "../../../../src/api/app";

describe("POST /genially", () => {
  it("should be possible to create a new genially", async () => {
    const body = {
      id: uuidv4(),
      name: "name",
      description: "description",
    };
    await request(app).post("/genially").send(body).expect(201);
  });
});
