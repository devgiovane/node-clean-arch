import { Notification } from "./Notification";

describe('Notification', function () {

	it('should be able register errors', function () {
		const notification = new Notification();
		notification.addError("error message", "customer");
		let errors = notification.messages('customer');
		expect(errors).toBe("[customer] error message")
		notification.addError("error message", "customer");
		errors = notification.messages('customer');
		expect(errors).toBe("[customer] error message, [customer] error message");
	});

	it('should be able check notification has errors', function () {
		const notification = new Notification();
		notification.addError("error message", "customer");
		expect(notification.hasErrors()).toBe(true);
	});

});
