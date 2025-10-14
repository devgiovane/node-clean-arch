import { FindCustomerUseCase } from "./FindCustomer.usecase";
import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import { CustomerValidator } from "~@Infra/validator/yup/Customer.validator";

describe('~[Integration] Find Customer UseCase', function () {

	let connectionDatabase: IConnectionDatabase;

	beforeEach(async () => {
		connectionDatabase = new SequelizeDatabase();
		await connectionDatabase.sync();
	});

	afterEach(async () => {
		await connectionDatabase.close();
	});

	it('should be able find customer', async function () {
		const customerValidator = new CustomerValidator();
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerValidator, customerRepository);
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
