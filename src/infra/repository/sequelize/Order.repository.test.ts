import { Sequelize } from "sequelize-typescript";

import { OrderRepository } from "./Order.repository";
import { ProductRepository } from "./Product.repository";
import { CustomerRepository } from "./Customer.repository";
import { Order } from "~@Domain/entity/Order.entity";
import { Address } from "~@Domain/entity/Address.entity";
import { Product } from "~@Domain/entity/Product.entity";
import { Customer } from "~@Domain/entity/Customer.entity";
import { OrderItem } from "~@Domain/entity/OrderItem.entity";
import { OrderMapper } from "~@Infra/mapper/sequelize/Order.mapper";
import { ProductMapper } from "~@Infra/mapper/sequelize/Product.mapper";
import { CustomerMapper } from "~@Infra/mapper/sequelize/Customer.mapper";
import { OrderItemMapper } from "~@Infra/mapper/sequelize/OrderItem.mapper";

describe('Order repository', function () {

	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: {force: true},
		});
		sequelize.addModels([CustomerMapper, OrderMapper, OrderItemMapper, ProductMapper]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it('should be able save order', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);

		const productRepository = new ProductRepository();
		const newProduct = new Product("1", "Product 1", 20);
		await productRepository.save(newProduct);

		const orderItem = new OrderItem("1", newProduct.getName(), newProduct.getPrice(), 2, newProduct.getId());
		const newOrder = new Order("1", "1", [orderItem]);
		const orderRepository = new OrderRepository();
		await orderRepository.save(newOrder);

		const order = await orderRepository.find("1");
		expect(order.toJSON()).toStrictEqual(newOrder.toJSON());
	});

	it('should be able a find order', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);

		const productRepository = new ProductRepository();
		const newProduct = new Product("1", "Product 1", 20);
		await productRepository.save(newProduct);

		const orderItem = new OrderItem("1", newProduct.getName(), newProduct.getPrice(), 2, newProduct.getId());
		const newOrder = new Order("1", "1", [orderItem]);
		const orderRepository = new OrderRepository();
		await orderRepository.save(newOrder);

		const order = await orderRepository.find("1");
		expect(order.toJSON()).toStrictEqual(newOrder.toJSON());
	});

	it('should be able a update order', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);

		const productRepository = new ProductRepository();
		const newProduct1 = new Product("1", "Product 1", 20);
		await productRepository.save(newProduct1);

		const orderItem1 = new OrderItem("1", newProduct1.getName(), newProduct1.getPrice(), 2, newProduct1.getId());
		const newOrder = new Order("1", "1", [orderItem1]);
		const orderRepository = new OrderRepository();
		await orderRepository.save(newOrder);

		const newProduct2 = new Product("2", "Product 2", 40);
		await productRepository.save(newProduct2);

		const orderItem2 = new OrderItem("2", newProduct2.getName(), newProduct2.getPrice(), 2, newProduct2.getId());
		newOrder.addItem(orderItem2);

		await orderRepository.update(newOrder);

		const order = await orderRepository.find("1");
		expect(order.toJSON()).toStrictEqual(newOrder.toJSON());
	});

	it('should be able a find all orders', async function () {
		const customerRepository = new CustomerRepository();
		const newCustomer = new Customer("1", "Customer 1");
		newCustomer.setAddress(new Address("Street", 1, "00000-000", "City"));
		await customerRepository.save(newCustomer);

		const productRepository = new ProductRepository();
		const newProduct = new Product("1", "Product 1", 10);
		await productRepository.save(newProduct);

		const orderItem = new OrderItem("1", newProduct.getName(), newProduct.getPrice(), 2, newProduct.getId());
		const newOrder = new Order("1", "1", [orderItem]);
		const orderRepository = new OrderRepository();
		await orderRepository.save(newOrder);

		const orders = await orderRepository.findAll();
		expect(orders).toHaveLength(1);
		expect(orders).toContainEqual(newOrder);
	});

});
