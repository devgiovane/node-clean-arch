import { Sequelize } from "sequelize-typescript";
import { CustomerMapper } from "~@Infra/mapper/sequelize/Customer.mapper";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";
import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import {ListCustomerUseCase} from "./ListCustomer.usecase";

describe('List Customer UseCase', function () {

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

	it('should be able list customer', async function () {
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
		const input1 = {
			name: "John",
			address: {
				street: "Street",
				number: 1,
				zip: "000",
				city: "City"
			}
		};
		await createCustomerUseCase.execute(input1);
		const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
		const output2 = await listCustomerUseCase.execute({});
		const [ customerOutput ] = output2;
		expect(output2.length).toBe(1);
		expect(customerOutput.name).toBe("John");
		expect(customerOutput.address.street).toBe("Street");
		expect(customerOutput.address.number).toBe(1);
		expect(customerOutput.address.zip).toBe("000");
		expect(customerOutput.address.city).toBe("City");
	});

});
