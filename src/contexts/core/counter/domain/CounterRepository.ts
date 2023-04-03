import { Counter } from "./Counter";

export interface CounterRepository {
  find(id: string): Promise<Counter>;
  save(counter: Counter): Promise<void>;
}
