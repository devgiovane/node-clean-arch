import { Customer } from "./Customer.entity";
import { Address } from "./Address.entity";
import { CustomerValidator } from "~@Infra/validator/yup/Customer.validator";

describe('Customer Entity', function () {

	it('should be able error when id is empty', function () {
		expect(function () {
			const customerValidator = new CustomerValidator()
			const customer = new Customer("", "John");
			customer.validate(customerValidator);
		}).toThrowError();
	});

	it('should be able error when name is empty', function () {
		expect(function () {
			const customerValidator = new CustomerValidator()
			const customer  = new Customer("1", "");
			customer.validate(customerValidator);
		}).toThrowError();
	});

	it('should be able change name', function () {
		const customerValidator = new CustomerValidator()
		const customer = new Customer("1", "John");
		customer.changeName("Jane");
		customer.validate(customerValidator);
		expect(customer.getName()).toEqual("Jane");
	});

	it('should be able activate customer', function () {
		const customer = new Customer("1", "John");
		const address = new Address("Street", 1, "000", "City");
		customer.setAddress(address);
		customer.activate();
		expect(customer.isActive()).toEqual(true);
	});

	it('should not be able activate customer', function () {
		expect(function () {
			const customer = new Customer("1", "John");
			customer.activate();
		}).toThrowError();
	});

	it('should be able deactivate customer', function () {
		const customer = new Customer("1", "John");
		customer.deactivate();
		expect(customer.isActive()).toEqual(false);
	});

	it('should be able set reward points', function () {
		const customer = new Customer("1", "Customer 1");
		expect(customer.getRewards()).toBe(0);
		customer.setRewards(10);
		expect(customer.getRewards()).toBe(10);
	});

});
