import { Address } from "~@Domain/entity/Address.entity";
import { Customer } from "~@Domain/entity/Customer.entity";
import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";

const newCustomer = new Customer("1", "John");
newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));

export const CustomerRepositoryMock = function (): jest.Mocked<ICustomerRepository> {
	return {
		find: jest.fn().mockReturnValue(newCustomer),
		findAll: jest.fn().mockReturnValue([newCustomer]),
		save: jest.fn(),
		update: jest.fn(),
	}
};
