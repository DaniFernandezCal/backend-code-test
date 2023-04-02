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

  it("when name used is smaller than the minimun allowed should throw a 400", async () => {
    const body = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(2),
      description: faker.datatype.string(25),
    };

    await request(app).post("/genially").send(body).expect(400);
  });

  it("when name used is greater than the maximun allowed should throw a 400", async () => {
    const body = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(21),
      description: faker.datatype.string(25),
    };

    await request(app).post("/genially").send(body).expect(400);
  });

  it("when description used has incorrect length should throw a 400", async () => {
    const body = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(5),
      description: faker.datatype.string(200),
    };

    await request(app).post("/genially").send(body).expect(400);
  });

  it("when name is not send should throw a 400", async () => {
    const body = {
      id: faker.datatype.uuid(),
      description: faker.datatype.string(25),
    };

    await request(app).post("/genially").send(body).expect(500);
  });
});
