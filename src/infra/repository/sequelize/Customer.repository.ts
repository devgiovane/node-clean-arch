import { ICustomerRepository } from "~@Domain/repository/ICustomer.repository";
import { Customer } from "~@Domain/entity/Customer.entity";
import { CustomerMapper } from "../../mapper/sequelize/Customer.mapper";
import { Address } from "~@Domain/entity/Address.entity";

export class CustomerRepository implements ICustomerRepository {

	public async find(id: string): Promise<Customer> {
		try {
			const response = await CustomerMapper.findOne({
				where: { id },
				rejectOnEmpty: true
			});
			const address = new Address(response.street, response.number, response.zip, response.city);
			const customer = new Customer(response.id, response.name);
			customer.setAddress(address);
			if (response.active) {
				customer.activate();
			}
			return customer;
		} catch (error) {
			throw new Error('could not find customer');
		}
	}

	public async findAll(): Promise<Array<Customer>> {
		const response = await CustomerMapper.findAll();
		return response.map(item => {
			const address = new Address(item.street, item.number, item.zip, item.city);
			const customer = new Customer(item.id, item.name);
			customer.setAddress(address);
			if (item.active) {
				customer.activate();
			}
			return customer;
		});
	}

	public async save(entity: Customer): Promise<void> {
		await CustomerMapper.create({
			id: entity.getId(),
			name: entity.getName(),
			street: entity.getAddress().getStreet(),
			number: entity.getAddress().getNumber(),
			zip: entity.getAddress().getZip(),
			city: entity.getAddress().getCity(),
			active: entity.isActive(),
			rewards: entity.getRewards()
		});
	}

	public async update(entity: Customer): Promise<void> {
		await CustomerMapper.update({
			name: entity.getName(),
			street: entity.getAddress().getStreet(),
			number: entity.getAddress().getNumber(),
			zip: entity.getAddress().getZip(),
			city: entity.getAddress().getCity(),
			active: entity.isActive(),
			rewards: entity.getRewards()
		}, {
			where: {
				id: entity.getId()
			},
			returning: undefined
		});
	}

}
