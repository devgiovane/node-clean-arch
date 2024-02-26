import { IEvent } from "./IEvent";
import { IEventHandler } from "./IEvent.handler";

export interface IEventDispatcher {
	notify(event: IEvent): void;
	register(name: string, handler: IEventHandler): void;
	unregister(name: string, handler: IEventHandler): void;
	clear(): void;
}
