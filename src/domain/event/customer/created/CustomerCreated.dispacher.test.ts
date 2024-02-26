import { EventDispatcher } from "../../@shared/Event.dispatcher";
import { CustomerCreatedEvent } from "./CustomerCreated.event";
import { SendConsoleLogOneHandler } from "./SendConsoleLogOne.handler";
import { SendConsoleLogTwoHandler } from "./SendConsoleLogTwo.handler";

describe('Customer Created Event Dispatcher', function () {

	it('should be able register all events', function () {
		const eventDispatcher = new EventDispatcher();
		const eventHandlerOne = new SendConsoleLogOneHandler();
		const eventHandlerTwo = new SendConsoleLogTwoHandler();
		eventDispatcher.register("CustomerCreatedEvent", eventHandlerOne);
		eventDispatcher.register("CustomerCreatedEvent", eventHandlerTwo);
		const handlers = eventDispatcher.getEventHandler("CustomerCreatedEvent");
		expect(handlers).toBeDefined();
		expect(handlers.length).toEqual(2);
	});

	it('should be able unregister all events', function () {
		const eventDispatcher = new EventDispatcher();
		const eventHandlerOne = new SendConsoleLogOneHandler();
		const eventHandlerTwo = new SendConsoleLogTwoHandler();
		eventDispatcher.register("CustomerCreatedEvent", eventHandlerOne);
		eventDispatcher.register("CustomerCreatedEvent", eventHandlerTwo);
		let handlers = eventDispatcher.getEventHandler("CustomerCreatedEvent");
		expect(handlers).toBeDefined();
		expect(handlers.length).toEqual(2);
		eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerOne);
		handlers = eventDispatcher.getEventHandler("CustomerCreatedEvent");
		expect(handlers.length).toEqual(1);
		eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerTwo);
		expect(handlers.length).toEqual(0);
	});

	it('should be able notify all events', function () {
		const eventDispatcher = new EventDispatcher();
		const eventHandlerOne = new SendConsoleLogOneHandler();
		const eventHandlerTwo = new SendConsoleLogTwoHandler();
		const spyEventHandlerOne = jest.spyOn(eventHandlerOne, "handle");
		const spyEventHandlerTwo = jest.spyOn(eventHandlerTwo, "handle");
		eventDispatcher.register("CustomerCreatedEvent", eventHandlerOne);
		eventDispatcher.register("CustomerCreatedEvent", eventHandlerTwo);
		const handlers = eventDispatcher.getEventHandler("CustomerCreatedEvent");
		expect(handlers).toBeDefined();
		const customerCreatedEvent = new CustomerCreatedEvent({});
		eventDispatcher.notify(customerCreatedEvent);
		expect(spyEventHandlerOne).toHaveBeenCalled();
		expect(spyEventHandlerTwo).toHaveBeenCalled();
	});

});
