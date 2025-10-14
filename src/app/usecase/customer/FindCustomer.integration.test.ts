import { Sequelize } from "sequelize-typescript";

import { FindCustomerUseCase } from "./FindCustomer.usecase";
import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { CustomerMapper } from "~@Infra/mapper/sequelize/Customer.mapper";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";

describe('~[Integration] Find Customer UseCase', function () {

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

	it('should be able find customer', async function () {
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
		const input1 = {
			name: "John",
			address: {
				street: "Street",
				number: 1,
				zip: "00000-000",
				city: "City"
			}
		};
		const output1 = await createCustomerUseCase.execute(input1);
		const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
		const input2 = {
			id: output1.id
		};
		const output2 = await findCustomerUseCase.execute(input2);
		expect(output2.id).toBeDefined();
		expect(output2.name).toBe("John");
		expect(output2.address.street).toBe("Street");
		expect(output2.address.number).toBe(1);
		expect(output2.address.zip).toBe("00000-000");
		expect(output2.address.city).toBe("City");
	});

});
