import faker from "faker";

import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import RenameGeniallyService from "../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import InMemoryGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import GeniallyNotExist from "../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import GeniallyName from "../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyInvalidName from "../../../../../src/contexts/core/genially/domain/GeniallyInvalidName";

describe("DeleteGeniallyService unit test", () => {
  let renameGeniallyservice: RenameGeniallyService;
  let geniallyRepository: GeniallyRepository;

  beforeAll(() => {
    geniallyRepository = new InMemoryGeniallyRepository();
    renameGeniallyservice = new RenameGeniallyService(geniallyRepository);
  });

  it("when genially not exist should throw an error", async () => {
    await expect(
      renameGeniallyservice.execute(
        "unnexistentGeniallyId",
        faker.datatype.string(5)
      )
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

    it("when genially name is updated modifiedAt and name should be updated", async () => {
      const newName = faker.datatype.string(10);
      await renameGeniallyservice.execute(createdGenially.id, newName);
      const updatedGenially = await geniallyRepository.find(createdGenially.id);
      expect(updatedGenially.modifiedAt).toBeDefined();
      expect(updatedGenially.name.name).toBe(newName);
    });

    it("when new name doesnt meet the length criteria should throw an error", async () => {
      const newName = faker.datatype.string(25);
      await expect(
        renameGeniallyservice.execute(createdGenially.id, newName)
      ).rejects.toThrow(GeniallyInvalidName);
    });
  });
});
