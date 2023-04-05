import faker from "faker";

import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import InMemoryGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import GeniallyInvalidName from "../../../../../src/contexts/core/genially/domain/GeniallyInvalidName";
import GeniallyInvalidDescription from "../../../../../src/contexts/core/genially/domain/GeniallyInvalidDescription";
import DomainEventBus from "../../../../../src/contexts/core/shared/infrastructure/DomainEventBus";
import { Uuid } from "../../../../../src/contexts/core/shared/domain/Uuid";
import InvalidArgumentError from "../../../../../src/contexts/core/shared/domain/InvalidArgumentError";

const eventBusMock = {
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  publish: jest.fn(),
};

describe("CreateGeniallyService unit test", () => {
  let createGeniallyService: CreateGeniallyService;
  let geniallyRepository: GeniallyRepository;
  let eventBus: DomainEventBus;

  beforeAll(() => {
    geniallyRepository = new InMemoryGeniallyRepository();
    eventBus = {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      publish: jest.fn(),
    } as unknown as DomainEventBus;
    createGeniallyService = new CreateGeniallyService(
      geniallyRepository,
      eventBus
    );
  });

  it("should be possible to create a new genially", async () => {
    const spy = jest.spyOn(eventBus, "publish");
    const geniallyData = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(5),
      description: faker.datatype.string(25),
    };

    await createGeniallyService.execute(geniallyData);

    const createadGenially = await geniallyRepository.find(
      new Uuid(geniallyData.id)
    );
    expect(createadGenially.id.value).toBe(geniallyData.id);
    expect(createadGenially.name.name).toBe(geniallyData.name);
    expect(createadGenially.description.description).toBe(
      geniallyData.description
    );
    expect(createadGenially.createdAt).toBeDefined();
    expect(spy).toBeCalledTimes(1);
  });

  it("should throw an error when used name has lower length than the allowed minimun", async () => {
    const geniallyData = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(2),
      description: faker.datatype.string(25),
    };
    await expect(createGeniallyService.execute(geniallyData)).rejects.toThrow(
      GeniallyInvalidName
    );
  });

  it("should throw an error when used name has greater length than the allowed maximun", async () => {
    const geniallyData = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(21),
      description: faker.datatype.string(25),
    };
    await expect(createGeniallyService.execute(geniallyData)).rejects.toThrow(
      GeniallyInvalidName
    );
  });

  it("should throw an error when id used is not an uuid", async () => {
    const geniallyData = {
      id: faker.datatype.string(15),
      name: faker.datatype.string(5),
      description: faker.datatype.string(25),
    };
    await expect(createGeniallyService.execute(geniallyData)).rejects.toThrow(
      InvalidArgumentError
    );
  });

  it("should throw an error when used description has incorrect length", async () => {
    const geniallyData = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(5),
      description: faker.datatype.string(150),
    };
    await expect(createGeniallyService.execute(geniallyData)).rejects.toThrow(
      GeniallyInvalidDescription
    );
  });
});
