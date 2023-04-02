import faker from "faker";

import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import DeleteGeniallyService from "../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import InMemoryGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import GeniallyNotExist from "../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import GeniallyName from "../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";

describe("DeleteGeniallyService unit test", () => {
  let deleteGeniallyService: DeleteGeniallyService;
  let geniallyRepository: GeniallyRepository;

  beforeAll(() => {
    geniallyRepository = new InMemoryGeniallyRepository();
    deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
  });

  it("when genially not exist should throw an error", async () => {
    await expect(
      deleteGeniallyService.execute("unnexistentGeniallyId")
    ).rejects.toThrow(GeniallyNotExist);
  });

  describe("given genially created", () => {
    let createdGenially: Genially;
    beforeAll(async () => {
      createdGenially = new Genially(
        faker.datatype.uuid(),
        new GeniallyName(faker.datatype.string(5)),
        new GeniallyDescription(faker.datatype.string(25))
      );
      geniallyRepository.save(createdGenially);
    });

    it("when genially is removed deletedAt should be setted", async () => {
      await deleteGeniallyService.execute(createdGenially.id);
      const removedGenially = await geniallyRepository.find(createdGenially.id);
      expect(removedGenially.deletedAt).toBeDefined();
    });
  });
});
