import { Sequelize } from "sequelize-typescript";

import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { CustomerMapper } from "~@Infra/mapper/sequelize/Customer.mapper";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";

describe('~[Integration] Create Customer UseCase', function () {

	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: {force: true},
		});
		sequelize.addModels([CustomerMapper]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it('should be able a create customer', async function () {
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
		const input = {
			name: "John",
			address: {
				street: "Street",
				number: 1,
				zip: "00000-000",
				city: "City"
			}
		}
		const output = await createCustomerUseCase.execute(input);
		expect(output.id).toBeDefined();
	});

	it('should be able an error when name is missing', async function () {
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
		const input = {
			name: "",
			address: {
				street: "Street",
				number: 1,
				zip: "00000-000",
				city: "City"
			}
		}
		await expect(async function () {
			await createCustomerUseCase.execute(input);
		}).rejects.toThrow("name is required");
	});

});
