import { DomainEvent } from "../../shared/domain/DomainEvent";

export interface GeniallyCreatedEventPayload {
  id: string;
  createdAt: Date;
}

export interface GeniallyCreatedEvent
  extends DomainEvent<GeniallyCreatedEventPayload> {
  type: "genially.created";
}
