import { IProductRepository } from "~@Domain/repository/IProduct.repository";
import { ProductFactory } from "~@Domain/factory/Product.factory";

type InputCreateProduct = {
	name: string,
	price: number
}

type OutputCreateProduct = {
	id: string
}

export class CreateProductUseCase {

	constructor(
		private readonly productRepository: IProductRepository
	) {
	}

	public async execute(input: InputCreateProduct): Promise<OutputCreateProduct> {
		const product = ProductFactory.create(input.name, input.price);
		await this.productRepository.save(product);
		return {
			id: product.getId()
		}
	}

}
