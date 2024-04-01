import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";
import { Address } from "~@Domain/entity/Address.entity";

type InputUpdateCustomer = {
	id: string,
	name: string;
	address: {
		street: string;
		number: number;
		zip: string;
		city: string;
	}
}

type OutputUpdateCustomer = {
	id: string
}

export class UpdateCustomerUseCase {

	constructor(
		private readonly customerRepository: ICustomerRepository
	) {
	}

	public async execute(input: InputUpdateCustomer): Promise<OutputUpdateCustomer> {
		const customer = await this.customerRepository.find(input.id);
		customer.changeName(input.name);
		const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city);
		customer.setAddress(address);
		await this.customerRepository.update(customer);
		return {
			id: customer.getId()
		}
	}

}
