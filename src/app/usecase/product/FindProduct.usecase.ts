import { IProductRepository } from "~@Domain/repository/IProduct.repository";

type InputFindProduct = {
	id: string,
}

type OutputFindCustomer = {
	id: string,
	name: string,
	price: number
}

export class FindProductUseCase {

	constructor(
		private readonly productRepository: IProductRepository
	) {
	}

	public async execute(input: InputFindProduct): Promise<OutputFindCustomer> {
		const product = await this.productRepository.find(input.id);
		return {
			id: product.getId(),
			name: product.getName(),
			price: product.getPrice()
		};
	}
}
