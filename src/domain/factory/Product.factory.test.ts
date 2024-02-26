import { ProductFactory } from "~@Domain/factory/Product.factory";

describe('Product Factory', function () {

	it('should be able make a product', function () {
		const product = ProductFactory.create("Name", 10.0);
		expect(product.getId()).toBeDefined();
		expect(product.getName()).toEqual("Name");
		expect(product.getPrice()).toEqual(10.0)
		expect(product.constructor.name).toEqual("Product")
	});

});
