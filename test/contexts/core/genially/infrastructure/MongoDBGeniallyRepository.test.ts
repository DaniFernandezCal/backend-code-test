import faker from "faker";
import { Collection } from "mongodb";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyDescription from "../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import GeniallyName from "../../../../../src/contexts/core/genially/domain/GeniallyName";
import MongoDBGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/MongoDBGeniallyRepository";
import { Uuid } from "../../../../../src/contexts/core/shared/domain/Uuid";
import SharedMongoClient from "../../../../../src/contexts/core/shared/infrastructure/SharedMongoClient";

describe("MongoDBGeniallyRepository integration test", () => {
  let sharedMongoClient: SharedMongoClient;
  let mongoDBRepository: MongoDBGeniallyRepository;
  let collection: Collection;

  beforeAll(async () => {
    sharedMongoClient = await SharedMongoClient.of();
    collection = sharedMongoClient.db().collection("genially");
    mongoDBRepository = new MongoDBGeniallyRepository(sharedMongoClient);
  });

  afterEach(async () => {
    await collection.deleteMany({});
  });

  it("should be possible to save genially", async () => {
    const uuid = faker.datatype.uuid();
    const genially = new Genially({
      id: new Uuid(uuid),
      name: new GeniallyName(faker.datatype.string(5)),
      description: new GeniallyDescription(faker.datatype.string(25)),
    });

    await mongoDBRepository.save(genially);
    const persistedGenillay = await collection.findOne({ id: genially.id });
    expect(persistedGenillay.id.value).toBe(genially.id.value);
    expect(persistedGenillay.name).toBe(genially.name.name);
    expect(persistedGenillay.description).toBe(
      genially.description.description
    );
  });

  describe("given genially cretead", () => {
    let createdGenially: Genially;
    let uuid: string;

    beforeEach(async () => {
      uuid = faker.datatype.uuid();
      createdGenially = new Genially({
        id: new Uuid(uuid),
        name: new GeniallyName(faker.datatype.string(5)),
        description: new GeniallyDescription(faker.datatype.string(25)),
      });
      await mongoDBRepository.save(createdGenially);
    });

    it("should be possible to find genially", async () => {
      const obtainedGenially = await mongoDBRepository.find(createdGenially.id);
      expect(obtainedGenially.id.value).toBe(createdGenially.id.value);
      expect(obtainedGenially.name.name).toBe(createdGenially.name.name);
      expect(obtainedGenially.description.description).toBe(
        createdGenially.description.description
      );
    });
  });
});
