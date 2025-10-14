import { CreateProductUseCase } from "./CreateProduct.usecase";
import { ProductRepositoryMock } from "~@Infra/repository/mock/Product.repository";

describe('Create Product UseCase', function () {

	it('should be able a create product', async function () {
		const productRepository = ProductRepositoryMock();
		const createProductUseCase = new CreateProductUseCase(productRepository);
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const output = await createProductUseCase.execute(input);
		expect(output.id).toBeDefined();
	});

});
