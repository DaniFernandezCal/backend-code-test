import request from "supertest";
import faker from "faker";

import app from "../../../../src/api/app";

describe("POST /genially", () => {
  it("should be possible to create a new genially", async () => {
    const body = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(10),
      description: faker.datatype.string(25),
    };
    await request(app).post("/genially").send(body).expect(201);
  });
});
