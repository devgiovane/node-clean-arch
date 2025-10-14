import { CreateProductUseCase } from "./CreateProduct.usecase";
import { ListProductUseCase } from "./ListProduct.usecase";
import { ProductRepositoryMock } from "~@Infra/repository/mock/Product.repository";

describe('List Product UseCase', function () {

	it('should be able a list product', async function () {
		const productRepository = ProductRepositoryMock();
		const createProductUseCase = new CreateProductUseCase(productRepository);
		const input1 = {
			name: 'Product 1',
			price: 10.0
		};
		await createProductUseCase.execute(input1);
		const listProductUseCase = new ListProductUseCase(productRepository);
		const output2 = await listProductUseCase.execute({});
		const [ productOutput ] = output2;
		expect(productOutput.id).toBeDefined();
		expect(productOutput.name).toBe("Product 1");
		expect(productOutput.price).toBe(10.0);
	});

});
