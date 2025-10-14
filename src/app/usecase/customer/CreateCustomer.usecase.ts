import { Address } from "~@Domain/entity/Address.entity";
import { CustomerFactory } from "~@Domain/factory/Customer.factory";
import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";
import { IValidator } from "~@Domain/validator/IValidator";
import { Customer } from "~@Domain/entity/Customer.entity";
import { DomainError } from "~@Domain/errors/Domain.error";
import { ApplicationError } from "~@App/errors/Application.error";

type InputCreateCustomer = {
	name: string,
	address: {
		street: string,
		city: string,
		number: number,
		zip: string
	}
}

type OutputCreateCustomer = {
	id: string
}

export class CreateCustomerUseCase {

	constructor(
		private readonly customerValidator: IValidator<Customer>,
		private readonly customerRepository: ICustomerRepository
	) {
	}

	public async execute(input: InputCreateCustomer): Promise<OutputCreateCustomer> {
		try {

			const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
			const customer = CustomerFactory.createWithAddress(input.name, address);
			customer.validate(this.customerValidator);
			await this.customerRepository.save(customer);
			return {
				id: customer.getId()
			}
		} catch (error) {
			if (error instanceof DomainError) {
				throw new ApplicationError('invalid customer data', 400);
			}
			throw new ApplicationError('internal server error', 500);
		}
	}

}
