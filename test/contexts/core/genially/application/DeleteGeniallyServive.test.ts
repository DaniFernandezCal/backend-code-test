import faker from "faker";

import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import DeleteGeniallyService from "../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import InMemoryGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import GeniallyNotExist from "../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import GeniallyName from "../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import { Uuid } from "../../../../../src/contexts/core/shared/domain/Uuid";

describe("DeleteGeniallyService unit test", () => {
  let deleteGeniallyService: DeleteGeniallyService;
  let geniallyRepository: GeniallyRepository;

  beforeAll(() => {
    geniallyRepository = new InMemoryGeniallyRepository();
    deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
  });

  it("when genially not exist should throw an error", async () => {
    await expect(
      deleteGeniallyService.execute(faker.datatype.uuid())
    ).rejects.toThrow(GeniallyNotExist);
  });

  describe("given genially created", () => {
    let uuid: string;
    let createdGenially: Genially;
    beforeAll(async () => {
      uuid = faker.datatype.uuid();
      createdGenially = new Genially(
        new Uuid(uuid),
        new GeniallyName(faker.datatype.string(5)),
        new GeniallyDescription(faker.datatype.string(25))
      );
      geniallyRepository.save(createdGenially);
    });

    it("when genially is removed deletedAt should be setted", async () => {
      await deleteGeniallyService.execute(uuid);
      const removedGenially = await geniallyRepository.find(createdGenially.id);
      expect(removedGenially.deletedAt).toBeDefined();
    });
  });
});
