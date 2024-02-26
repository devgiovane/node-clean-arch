import { IEvent } from "~@Domain/event/@shared/IEvent";

export interface IEventHandler<T extends IEvent=IEvent> {
	handle(event: T): void;
}
