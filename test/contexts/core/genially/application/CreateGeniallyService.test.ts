import faker from "faker";

import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import InMemoryGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

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
    expect(createadGenially.name).toBe(geniallyData.name);
    expect(createadGenially.description).toBe(geniallyData.description);
    expect(createadGenially.createdAt).toBeDefined();
  });
});
