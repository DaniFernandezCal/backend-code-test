import { EventEmitter } from "events";
import { DomainEvent } from "../domain/DomainEvent";

export default class DomainEventBus {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  public subscribe(
    eventName: string,
    listener: (event: DomainEvent<unknown>) => void
  ) {
    this.emitter.on(eventName, listener);
  }

  public unsubscribe(
    eventName: string,
    listener: (event: DomainEvent<unknown>) => void
  ) {
    this.emitter.off(eventName, listener);
  }

  public publish(event: DomainEvent<unknown>) {
    this.emitter.emit(event.type, event);
  }
}
