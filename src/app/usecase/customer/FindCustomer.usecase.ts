import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";

type InputFindCustomer = {
	id: string,
}

type OutputFindCustomer = {
	id: string,
	name: string,
	address: {
		street: string,
		city: string,
		number: number,
		zip: string
	}
}

export class FindCustomerUseCase {

	constructor(
		private readonly customerRepository: ICustomerRepository
	) {
	}

	public async execute(input: InputFindCustomer): Promise<OutputFindCustomer> {
		const customer = await this.customerRepository.find(input.id);
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
	}
}
