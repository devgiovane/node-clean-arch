import { CreateProductUseCase } from "./CreateProduct.usecase";
import { UpdateProductUseCase } from "./UpdateProduct.usecase";
import { FindProductUseCase } from "./FindProduct.usecase";
import { ProductRepositoryMock } from "~@Infra/repository/mock/Product.repository";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";

describe('Update Product UseCase', function () {

	it('should be able update product', async function () {
		const productValidator = new ProductValidator();
		const productRepository = ProductRepositoryMock();
		const createProductUseCase = new CreateProductUseCase(productValidator, productRepository);
		const input1 = {
			name: 'Product 2',
			price: 11.1
		};
		const output1 = await createProductUseCase.execute(input1);
		const updateProductUseCase = new UpdateProductUseCase(productRepository);
		const input2 = {
			id: output1.id,
			name: 'Product 1',
			price: 10
		};
		const output2 = await updateProductUseCase.execute(input2);
		const input3 = {
			id: output2.id
		}
		const findProductUseCase= new FindProductUseCase(productRepository);
		const output3 = await findProductUseCase.execute(input3);
		expect(output3.id).toBeDefined();
		expect(output3.name).toBe("Product 1");
		expect(output3.price).toBe(10);
	});

});
