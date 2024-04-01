import { IProductRepository } from "~@Domain/repository/IProduct.repository";

type InputListProduct = {
}

type OutputListProduct = {
	id: string,
	name: string,
	price: number
}

export class ListProductUseCase {

	constructor(
		private readonly productRepository: IProductRepository
	) {
	}

	public async execute(input: InputListProduct): Promise<OutputListProduct[]> {
		const products = await this.productRepository.findAll();
		return products.map(function(product) {
			return {
				id: product.getId(),
				name: product.getName(),
				price: product.getPrice()
			}
		});
	}
}
