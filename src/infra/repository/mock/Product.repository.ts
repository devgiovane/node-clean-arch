import { Product } from "~@Domain/entity/Product.entity";
import { IProductRepository } from "~@Domain/repository/IProduct.repository";

const newProduct = new Product("1", "Product 1", 100);

export const ProductRepositoryMock = function (): jest.Mocked<IProductRepository> {
	return {
		find: jest.fn().mockReturnValue(newProduct),
		findAll: jest.fn().mockReturnValue([newProduct]),
		save: jest.fn(),
		update: jest.fn(),
	}
};
