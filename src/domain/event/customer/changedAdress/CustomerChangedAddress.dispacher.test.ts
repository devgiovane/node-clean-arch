import { EventDispatcher } from "../../@shared/Event.dispatcher";
import { SendConsoleLogHandler } from "./SendConsoleLog.handler";
import { CustomerChangedAddressEvent } from "./CustomerChangedAddress.event";

describe('Customer Changed Address Event Dispatcher', function () {

	it('should be able register event', function () {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendConsoleLogHandler();
		eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
		const handlers = eventDispatcher.getEventHandler("CustomerChangedAddressEvent");
		expect(handlers).toBeDefined();
		expect(handlers.length).toEqual(1);
	});

	it('should be able unregister event', function () {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendConsoleLogHandler();
		eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
		let handlers = eventDispatcher.getEventHandler("CustomerChangedAddressEvent");
		expect(handlers).toBeDefined();
		expect(handlers.length).toEqual(1);
		eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler);
		handlers = eventDispatcher.getEventHandler("CustomerChangedAddressEvent");
		expect(handlers.length).toEqual(0);
	});

	it('should be able notify event', function () {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendConsoleLogHandler();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");
		eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
		const handlers = eventDispatcher.getEventHandler("CustomerChangedAddressEvent");
		expect(handlers).toBeDefined();
		expect(handlers.length).toEqual(1);
		const customerChangedAddressEvent = new CustomerChangedAddressEvent({
			id: 1,
			name: 'Giovane Santos Silva',
			address: 'R. John, 56'
		})
		eventDispatcher.notify(customerChangedAddressEvent);
		expect(spyEventHandler).toHaveBeenCalled();
	});

});
