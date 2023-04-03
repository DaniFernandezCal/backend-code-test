import { EventEmitter } from "stream";
import { GeniallyCreatedEvent } from "../../genially/domain/GeniallyCreatedDomainEvent";

export default class DomainEventBus {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  public subscribe(
    eventName: string,
    listener: (event: GeniallyCreatedEvent) => void
  ) {
    this.emitter.on(eventName, listener);
  }

  public unsubscribe(
    eventName: string,
    listener: (event: GeniallyCreatedEvent) => void
  ) {
    this.emitter.off(eventName, listener);
  }

  public publish(event: GeniallyCreatedEvent) {
    this.emitter.emit(event.type, event);
  }
}
