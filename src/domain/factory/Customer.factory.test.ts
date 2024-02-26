import { CustomerFactory } from "~@Domain/factory/Customer.factory";
import { Address } from "~@Domain/entity/Address.entity";

describe('Customer Factory', function () {

	it('should be able a make customer', function () {
		const customer = CustomerFactory.create("Giovane");
		expect(customer.getId()).toBeDefined();
		expect(customer.getName()).toEqual("Giovane");
		expect(customer.getAddress()).toBeUndefined();
	});

	it('should be able a make customer with address', function () {
		const address = new Address("R. John", 56, "123456-78", "São Paulo");
		const customer = CustomerFactory.createWithAddress("Giovane", address);
		expect(customer.getId()).toBeDefined();
		expect(customer.getName()).toEqual("Giovane");
		expect(customer.getAddress()).toBe(address);
	});

});
