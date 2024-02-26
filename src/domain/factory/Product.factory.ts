import * as uuid  from "uuid";

import { Product } from "~@Domain/entity/Product.entity";
import { IProduct } from "~@Domain/entity/IProduct";

export class ProductFactory {

	public static create(name: string, price: number): IProduct {
		return new Product(uuid.v4(), name, price);
	}

}
