import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import { CustomerValidator } from "~@Infra/validator/yup/Customer.validator";

describe('~[Integration] Create Customer UseCase', function () {

	let connectionDatabase: IConnectionDatabase;

	beforeEach(async () => {
		connectionDatabase = new SequelizeDatabase();
		await connectionDatabase.sync();
	});

	afterEach(async () => {
		await connectionDatabase.close();
	});

	it('should be able a create customer', async function () {
		const customerValidator = new CustomerValidator();
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerValidator, customerRepository);
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
		const customerValidator = new CustomerValidator();
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerValidator, customerRepository);
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
		}).rejects.toThrow("invalid customer data");
	});

});
