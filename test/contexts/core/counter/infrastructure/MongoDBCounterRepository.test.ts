import { Collection } from "mongodb";
import { Counter } from "../../../../../src/contexts/core/counter/domain/Counter";
import MongoDBCounterRepository from "../../../../../src/contexts/core/counter/infrastructure/MongoDBCounterRepository";
import SharedMongoClient from "../../../../../src/contexts/core/shared/infrastructure/SharedMongoClient";

describe("MongoDBCounterRepository integration test", () => {
  let sharedMongoClient: SharedMongoClient;
  let mongoDBRepository: MongoDBCounterRepository;
  let collection: Collection;

  beforeAll(async () => {
    sharedMongoClient = await SharedMongoClient.of();
    collection = sharedMongoClient
      .db()
      .collection(MongoDBCounterRepository.getCollection());
    mongoDBRepository = new MongoDBCounterRepository(sharedMongoClient);
  });

  afterEach(async () => {
    await collection.deleteMany({});
  });

  it("should be possible to save counter", async () => {
    const counter = new Counter(1);

    await mongoDBRepository.save(counter);
    const persistedCounter = await collection.findOne({ id: Counter.ID });
    expect(persistedCounter.count).toBe(counter.count);
  });

  describe("given genially cretead", () => {
    let createdCounter: Counter;

    beforeEach(async () => {
      createdCounter = new Counter(3);
      await mongoDBRepository.save(createdCounter);
    });

    it("should be possible to find genially", async () => {
      const obtainedCounter = await mongoDBRepository.find(Counter.ID);
      expect(obtainedCounter.count).toBe(createdCounter.count);
    });
  });
});
