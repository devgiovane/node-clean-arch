import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { ListCustomerUseCase } from "./ListCustomer.usecase";
import { CustomerValidator } from "~@Infra/validator/yup/Customer.validator";
import { CustomerRepositoryMock } from "~@Infra/repository/mock/Customer.repository";

describe('~[Unit] List Customer UseCase', function () {

	it('should be able list customer', async function () {
		const customerValidator = new CustomerValidator();
		const customerRepository = CustomerRepositoryMock();
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
		await createCustomerUseCase.execute(input1);
		const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
		const output2 = await listCustomerUseCase.execute({});
		const [ customerOutput ] = output2;
		expect(output2.length).toBe(1);
		expect(customerOutput.name).toBe("John");
		expect(customerOutput.address.street).toBe("Street");
		expect(customerOutput.address.number).toBe(1);
		expect(customerOutput.address.zip).toBe("00000-000");
		expect(customerOutput.address.city).toBe("City");
	});

});
