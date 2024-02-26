import { Sequelize} from "sequelize-typescript";
import { CustomerMapper } from "../../mapper/sequelize/Customer.mapper";
import { CustomerRepository } from "./Customer.repository";
import { Customer } from "~@Domain/entity/Customer.entity";
import { Address } from "~@Domain/entity/Address.entity";

describe('Customer repository', function () {

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

	it('should be able save customer', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);
		const customer = await customerRepository.find("1");
		expect(customer.toJSON()).toStrictEqual(newCustomer.toJSON());
	});

	it('should be able update customer', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);
		newCustomer.changeName("Customer 2");
		newCustomer.activate();
		await customerRepository.update(newCustomer);
		const customer = await customerRepository.find("1");
		expect(customer.toJSON()).toStrictEqual(newCustomer.toJSON());
	});

	it('should be able a find customer', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);
		const customer = await customerRepository.find("1");
		expect(customer.toJSON()).toStrictEqual(newCustomer.toJSON());
	});

	it('should not be able a find customer', function () {
		expect(async function () {
			const customerRepository = new CustomerRepository();
			await customerRepository.find("1")
		}).rejects.toThrow();
	});

	it('should be able a find all customer', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);
		const products = await customerRepository.findAll();
		expect(products).toHaveLength(1);
		expect(products).toContainEqual(newCustomer);
	});

});

