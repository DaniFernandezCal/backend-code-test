import faker from "faker";

import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import InMemoryGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import GeniallyInvalidName from "../../../../../src/contexts/core/genially/domain/GeniallyInvalidName";
import GeniallyInvalidDescription from "../../../../../src/contexts/core/genially/domain/GeniallyInvalidDescription";

describe("CreateGeniallyService unit test", () => {
  let createGeniallyService: CreateGeniallyService;
  let geniallyRepository: GeniallyRepository;

  beforeAll(() => {
    geniallyRepository = new InMemoryGeniallyRepository();
    createGeniallyService = new CreateGeniallyService(geniallyRepository);
  });

  it("should be possible to create a new genially", async () => {
    const geniallyData = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(5),
      description: faker.datatype.string(25),
    };

    await createGeniallyService.execute(geniallyData);

    const createadGenially = await geniallyRepository.find(geniallyData.id);
    expect(createadGenially.id).toBe(geniallyData.id);
    expect(createadGenially.name.name).toBe(geniallyData.name);
    expect(createadGenially.description.description).toBe(
      geniallyData.description
    );
    expect(createadGenially.createdAt).toBeDefined();
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
