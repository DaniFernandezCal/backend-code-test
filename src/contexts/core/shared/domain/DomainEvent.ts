export interface DomainEvent<T> {
  type: string;
  payload: T;
}
