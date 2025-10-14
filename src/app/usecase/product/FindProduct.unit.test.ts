import { CreateProductUseCase } from "./CreateProduct.usecase";
import { FindProductUseCase } from "./FindProduct.usecase";
import { ProductRepositoryMock } from "~@Infra/repository/mock/Product.repository";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";

describe('Find Product UseCase', function () {

	it('should be able a find product', async function () {
		const productValidator = new ProductValidator();
		const productRepository = ProductRepositoryMock();
		const createProductUseCase = new CreateProductUseCase(productValidator, productRepository);
		const input1 = {
			name: 'Product 1',
			price: 10.0
		};
		const output1 = await createProductUseCase.execute(input1);
		const input2 = {
			id: output1.id
		}
		const findProductUseCase= new FindProductUseCase(productRepository);
		const output2 = await findProductUseCase.execute(input2);
		expect(output2.id).toBeDefined();
		expect(output2.name).toBe("Product 1");
		expect(output2.price).toBe(10.0);
	});

});
