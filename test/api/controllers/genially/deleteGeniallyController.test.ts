import request from "supertest";
import faker from "faker";

import app from "../../../../src/api/app";
import SharedMongoClient from "../../../../src/contexts/core/shared/infrastructure/SharedMongoClient";

describe("DELETE /genially/:{geniallyId}", () => {
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
      .delete(`/genially/${faker.datatype.uuid()}`)
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
    it("should be possible to delete a genially given geniallyId", async () => {
      await request(app).delete(`/genially/${geniallyId}`).send().expect(204);
    });
  });
});
