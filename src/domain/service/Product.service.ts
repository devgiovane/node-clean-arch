import { Product } from "../entity/Product.entity";

export class ProductService {

	public static increasePrice(products: Array<Product>, percentage: number): void {
		products.forEach(product =>
			product.changePrice(product.getPrice() + (product.getPrice() * percentage) / 100)
		);
	}

}
