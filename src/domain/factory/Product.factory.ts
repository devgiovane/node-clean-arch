import * as uuid  from "uuid";

import { Product } from "~@Domain/entity/Product.entity";

export class ProductFactory {

	public static create(name: string, price: number): Product {
		return new Product(uuid.v4(), name, price);
	}

}
