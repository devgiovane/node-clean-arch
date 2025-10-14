import { Product } from "./Product.entity";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";

describe('Product Entity', function () {

	it('should be able error when id is empty', function () {
		expect(function () {
			const productValidator = new ProductValidator();
			const product = new Product("", "Product 1", 100);
			product.validate(productValidator);
		}).toThrowError();
	});

	it('should be able error when price less than zero', function () {
		expect(function () {
			const productValidator = new ProductValidator();
			const product  = new Product("1", "Product 1", -1);
			product.validate(productValidator);
		}).toThrowError();
	});

	it('should be able change name', function () {
		const productValidator = new ProductValidator();
		const product = new Product("1", "Product 1", 100);
		product.changeName("New product 1");
		product.validate(productValidator);
		expect(product.getName()).toEqual("New product 1");
	});

	it('should be able change price', function () {
		const productValidator = new ProductValidator();
		const product = new Product("1", "Product 1", 100);
		product.changePrice(200);
		product.validate(productValidator);
		expect(product.getPrice()).toEqual(200);
	});

});
