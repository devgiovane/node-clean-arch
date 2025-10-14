import { CreateCustomerUseCase } from "./CreateCustomer.usecase";
import { CustomerRepositoryMock } from "~@Infra/repository/mock/Customer.repository";
import { CustomerValidator } from "~@Infra/validator/yup/Customer.validator";

describe('~[Unit] Create Customer UseCase', function () {

	it('should be able a create customer', async function () {
		const customerValidator = new CustomerValidator();
		const customerRepository = CustomerRepositoryMock();
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
		const customerRepository = CustomerRepositoryMock();
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
