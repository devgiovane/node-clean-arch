import { CreateProductUseCase } from "./CreateProduct.usecase";
import { FindProductUseCase } from "./FindProduct.usecase";
import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";

describe('Find Product UseCase', function () {

	let connectionDatabase: IConnectionDatabase;

	beforeEach(async () => {
		connectionDatabase = new SequelizeDatabase();
		await connectionDatabase.sync();
	});

	afterEach(async () => {
		await connectionDatabase.close();
	});

	it('should be able a find product', async function () {
		const productValidator = new ProductValidator();
		const productRepository = new ProductRepository();
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
