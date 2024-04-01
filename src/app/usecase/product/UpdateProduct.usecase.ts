import { IProductRepository } from "~@Domain/repository/IProduct.repository";

type InputUpdateProduct = {
	id: string,
	name: string,
	price: number
}

type OutputUpdateProduct = {
	id: string
}

export class UpdateProductUseCase {

	constructor(
		private readonly productRepository: IProductRepository
	) {
	}

	public async execute(input: InputUpdateProduct): Promise<OutputUpdateProduct> {
		const product = await this.productRepository.find(input.id);
		product.changeName(input.name);
		product.changePrice(input.price);
		await this.productRepository.update(product);
		return {
			id: product.getId()
		}
	}
}
