import { GeniallyCreatedEvent } from "../../genially/domain/GeniallyCreatedDomainEvent";
import { Counter } from "../domain/Counter";
import { CounterRepository } from "../domain/CounterRepository";
import DomainEventBus from "../../shared/infrastructure/DomainEventBus";

export default class CounterService {
  constructor(
    private readonly repository: CounterRepository,
    private readonly eventBus: DomainEventBus
  ) {}

  public start() {
    this.eventBus.subscribe(
      "genially.created",
      this.handleGeniallyCreated.bind(this)
    );
  }

  public async handleGeniallyCreated(event: GeniallyCreatedEvent) {
    const counter = await this.repository.find(Counter.ID);
    if (!counter) {
      const initializedCounter = new Counter(0);
      initializedCounter.increment();
      await this.repository.save(initializedCounter);
      return;
    }

    counter.increment();
    await this.repository.save(counter);
  }
}
