import { Sequelize } from "sequelize-typescript";
import { Product } from "~@Domain/entity/Product.entity";
import { ProductMapper } from "../../mapper/sequelize/Product.mapper";
import { ProductRepository } from "./Product.repository";

describe('Product repository', function() {

	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductMapper]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});


	it('should be able save product', async function () {
		const productRepository = new ProductRepository();
		const newProduct = new Product("1", "Product 1", 100);
		await productRepository.save(newProduct);
		const product = await productRepository.find("1");
		expect(product.toJSON()).toStrictEqual(newProduct.toJSON());
	});

	it('should be able update product', async function () {
		const productRepository = new ProductRepository();
		const newProduct = new Product("1", "Product 1", 100);
		await productRepository.save(newProduct);
		newProduct.changeName("Product 2");
		newProduct.changePrice(200);
		await productRepository.update(newProduct);
		const product = await productRepository.find("1");
		expect(product.toJSON()).toStrictEqual(newProduct.toJSON());
	});

	it('should be able a find product', async function () {
		const productRepository = new ProductRepository();
		const newProduct = new Product("1", "Product 1", 100);
		await productRepository.save(newProduct);
		const product = await productRepository.find("1");
		expect(product.toJSON()).toStrictEqual(newProduct.toJSON());
	});

	it('should be able a find all products', async function () {
		const productRepository = new ProductRepository();
		const newProductOne = new Product("1", "Product 1", 100);
		const newProductTwo = new Product("2", "Product 2", 200);
		await productRepository.save(newProductOne);
		await productRepository.save(newProductTwo);
		const products = await productRepository.findAll();
		expect(products).toHaveLength(2);
		expect(products).toContainEqual(newProductOne);
		expect(products).toContainEqual(newProductTwo);
	});

});
