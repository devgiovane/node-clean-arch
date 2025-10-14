import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { FindCustomerUseCase } from "./FindCustomer.usecase";
import { UpdateCustomerUseCase } from "./UpdateCustomer.usecase";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import {CustomerValidator} from "~@Infra/validator/yup/Customer.validator";

describe('~[Integration] Update Customer UseCase', function () {

	let connectionDatabase: IConnectionDatabase;

	beforeEach(async () => {
		connectionDatabase = new SequelizeDatabase();
		await connectionDatabase.sync();
	});

	afterEach(async () => {
		await connectionDatabase.close();
	});

	it('should be able update customer',  async function () {
		const customerValidator = new CustomerValidator();
		const customerRepository = new CustomerRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerValidator, customerRepository);
		const input1 = {
			name: "John Doe",
			address: {
				street: "New Street",
				number: 2,
				zip: "00000-000",
				city: "City"
			}
		};
		const output1 = await createCustomerUseCase.execute(input1);
		const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
		const input2 = {
			id: output1.id,
			name: "John",
			address: {
				street: "Street",
				number: 1,
				zip: "00000-000",
				city: "City"
			}
		};
		const output2 = await updateCustomerUseCase.execute(input2);
		const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
		const input3 = {
			id: output2.id
		};
		const output3 = await findCustomerUseCase.execute(input3);
		expect(output3.id).toBeDefined();
		expect(output3.name).toBe("John");
		expect(output3.address.street).toBe("Street");
		expect(output3.address.number).toBe(1);
		expect(output3.address.zip).toBe("00000-000");
		expect(output3.address.city).toBe("City");
	});

});
