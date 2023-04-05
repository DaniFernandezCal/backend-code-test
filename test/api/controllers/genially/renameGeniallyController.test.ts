import request from "supertest";
import faker from "faker";

import app from "../../../../src/api/app";
import SharedMongoClient from "../../../../src/contexts/core/shared/infrastructure/SharedMongoClient";

describe("PATCH /genially/:{geniallyId}", () => {
  let sharedMongoClient: SharedMongoClient;
  const collection = "genially";

  beforeAll(async () => {
    sharedMongoClient = SharedMongoClient.of();
  });

  afterAll(async () => {
    await sharedMongoClient.dropCollection(collection);
  });

  it("when genially doesnt exist should throw an error", async () => {
    await request(app)
      .patch(`/genially/${faker.datatype.uuid()}`)
      .send()
      .expect(404);
  });

  describe("given genially created", () => {
    let geniallyId: string;
    beforeAll(async () => {
      geniallyId = faker.datatype.uuid();
      await request(app)
        .post("/genially")
        .send({
          id: geniallyId,
          name: faker.datatype.string(5),
          description: faker.datatype.string(25),
        });
    });
    it("should be possible to update the name of the genially given geniallyId", async () => {
      const name = faker.datatype.string(10);
      await request(app)
        .patch(`/genially/${geniallyId}`)
        .send({ name })
        .expect(204);
    });
  });
});
