import { Address } from "~@Domain/entity/Address.entity";
import { CustomerFactory } from "~@Domain/factory/Customer.factory";
import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";

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
		private readonly customerRepository: ICustomerRepository
	) {
	}

	public async execute(input: InputCreateCustomer): Promise<OutputCreateCustomer> {
		const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
		const customer = CustomerFactory.createWithAddress(input.name, address);
		await this.customerRepository.save(customer);
		return {
			id: customer.getId()
		}
	}

}
