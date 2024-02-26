import { Product } from "./Product.entity";

describe('Product Entity', function () {

	it('should be able error when id is empty', function () {
		expect(function () {
			new Product("", "Product 1", 100);
		}).toThrowError();
	});

	it('should be able error when price less than zero', function () {
		expect(function () {
			new Product("1", "Product 1", -1);
		}).toThrowError();
	});

	it('should be able change name', function () {
		const product = new Product("1", "Product 1", 100);
		product.changeName("New product 1");
		expect(product.getName()).toEqual("New product 1");
	});

	it('should be able change price', function () {
		const product = new Product("1", "Product 1", 100);
		product.changePrice(200);
		expect(product.getPrice()).toEqual(200);
	});

});
