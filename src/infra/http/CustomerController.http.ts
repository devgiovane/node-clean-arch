import { IServerHttp } from "./IServer.http";
import { CustomerRepository } from "~@Infra/repository/sequelize/Customer.repository";
import { CreateCustomerUseCase } from "~@App/usecase/customer/CreateCustomer.usecase";
import { ListCustomerUseCase } from "~@App/usecase/customer/ListCustomer.usecase";
import { FindCustomerUseCase } from "~@App/usecase/customer/FindCustomer.usecase";
import { UpdateCustomerUseCase } from "~@App/usecase/customer/UpdateCustomer.usecase";
import { CustomerValidator } from "~@Infra/validator/yup/Customer.validator";

export class CustomerControllerHttp {

	constructor(
		httpServer: IServerHttp,
	) {
		const customerRepository = new CustomerRepository();
		httpServer.on("POST", "/customer", async function ({ body }) {
			const customerValidator = new CustomerValidator();
			const createCustomerUseCase = new CreateCustomerUseCase(customerValidator, customerRepository);
			return await createCustomerUseCase.execute(body);
		});
		httpServer.on("GET", "/customer", async function () {
			const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
			return await listCustomerUseCase.execute({});
		});
		httpServer.on("GET", "/customer/:id", async function ({ params }) {
			const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
			return await findCustomerUseCase.execute({ id: params.id });
		});
		httpServer.on("PUT", "/customer", async function ({ body }) {
			const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
			return await updateCustomerUseCase.execute(body);
		});
	}

}
