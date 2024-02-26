import { IEvent } from "./IEvent";
import { IEventHandler } from "./IEvent.handler";
import { IEventDispatcher } from "./IEvent.dispatcher";

type Events = {
	[name: string]: Array<IEventHandler>
}

export class EventDispatcher implements IEventDispatcher {

	private events: Events = {};

	public notify(event: IEvent): void {
		const name = event.constructor.name;
		if (this.events.hasOwnProperty(name)) {
			this.events[name].forEach(handler => handler.handle(event));
		}
	}

	public register(name: string, handler: IEventHandler): void {
		if (!this.events[name]) {
			this.events[name] = [];
		}
		this.events[name].push(handler);
	}

	public unregister(name: string, handler: IEventHandler): void {
		const handlers = this.events[name];
		const handlerIndex =  handlers.indexOf(handler);
		if (handlerIndex === -1) return;
		handlers.splice(handlerIndex, 1);
	}

	public clear(): void {
		this.events = {};
	}

	public getEventHandler(name: string): Array<IEventHandler> {
		return this.events[name];
	}

}
