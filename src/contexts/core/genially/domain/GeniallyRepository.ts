import { Uuid } from "../../shared/domain/Uuid";
import Genially from "./Genially";

interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: Uuid): Promise<Genially>;

  delete(id: Uuid): Promise<void>;
}

export default GeniallyRepository;
