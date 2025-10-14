import { IProductRepository } from "~@Domain/repository/IProduct.repository";
import { ProductFactory } from "~@Domain/factory/Product.factory";
import { IValidator } from "~@Domain/validator/IValidator";
import { Product } from "~@Domain/entity/Product.entity";
import { DomainError } from "~@Domain/errors/Domain.error";
import {ApplicationError} from "~@App/errors/Application.error";

type InputCreateProduct = {
	name: string,
	price: number
}

type OutputCreateProduct = {
	id: string
}

export class CreateProductUseCase {

	constructor(
		private readonly productValidator: IValidator<Product>,
		private readonly productRepository: IProductRepository
	) {
	}

	public async execute(input: InputCreateProduct): Promise<OutputCreateProduct> {
		try {
			const product = ProductFactory.create(input.name, input.price);
			product.validate(this.productValidator);
			await this.productRepository.save(product);
			return {
				id: product.getId()
			}
		} catch (error) {
			if (error instanceof DomainError) {
				throw new ApplicationError('invalid customer data', 400);
			}
			throw new ApplicationError('internal server error', 500);
		}
	}

}
