import { Product } from "../entity/Product.entity";
import { ProductService } from "./Product.service";

describe('Product service', function() {

	it('should be able change price of all products', function () {
		const products = [
			new Product("1", "Product 1", 10),
			new Product("2", "Product 2", 20)
		]
		ProductService.increasePrice(products, 100);
		const [ productOne, productTwo ] = products;
		expect(productOne.getPrice()).toEqual(20);
		expect(productTwo.getPrice()).toEqual(40);
	});

});
