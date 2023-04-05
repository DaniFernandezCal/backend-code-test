import { DomainEvent } from "../../shared/domain/DomainEvent";
import { Uuid } from "../../shared/domain/Uuid";

export interface GeniallyCreatedEventPayload {
  id: Uuid;
  createdAt: Date;
}

export interface GeniallyCreatedEvent
  extends DomainEvent<GeniallyCreatedEventPayload> {
  type: "genially.created";
}
