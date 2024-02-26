import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";

type InputListCustomer = {
}

type OutputListCustomer = {
	id: string,
	name: string,
	address: {
		street: string,
		city: string,
		number: number,
		zip: string
	}
}

export class ListCustomerUseCase {

	constructor(
		private readonly customerRepository: ICustomerRepository
	) {
	}

	public async execute(input: InputListCustomer): Promise<OutputListCustomer[]> {
		const customers = await this.customerRepository.findAll();
		return customers.map(function (customer) {
			return {
				id: customer.getId(),
				name: customer.getName(),
				address: {
					street: customer.getAddress().getStreet(),
					city: customer.getAddress().getCity(),
					number: customer.getAddress().getNumber(),
					zip: customer.getAddress().getZip()
				}
			}
		});
	}

}
