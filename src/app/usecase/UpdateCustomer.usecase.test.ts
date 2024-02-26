import { Sequelize } from "sequelize-typescript";
import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { CustomerMapper } from "~@Infra/mapper/sequelize/Customer.mapper";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";
import {UpdateCustomerUseCase} from "./UpdateCustomer.usecase";
import {FindCustomerUseCase} from "./FindCustomer.usecase";

describe('Find Customer UseCase', function () {

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

	it('should be able update customer',  async function () {
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
		const output1 = await createCustomerUseCase.execute(input1);
		const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
		const input2 = {
			id: output1.id,
			name: "John Doe",
			address: {
				street: "New Street",
				number: 2,
				zip: "000",
				city: "City"
			}
		};
		const output2 = await updateCustomerUseCase.execute(input2);
		const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
		const input3 = {
			id: output2.id
		};
		const output3 = await findCustomerUseCase.execute(input2);
		expect(output3.id).toBeDefined();
		expect(output3.name).toBe("John Doe");
		expect(output3.address.street).toBe("New Street");
		expect(output3.address.number).toBe(2);
		expect(output3.address.zip).toBe("000");
		expect(output3.address.city).toBe("City");
	});

});
