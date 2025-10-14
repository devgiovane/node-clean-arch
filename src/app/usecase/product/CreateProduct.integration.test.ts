import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";
import { CreateProductUseCase } from "./CreateProduct.usecase";
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";

describe('Create Product UseCase', function () {

	let connectionDatabase: IConnectionDatabase;

	beforeEach(async () => {
		connectionDatabase = new SequelizeDatabase();
		await connectionDatabase.sync();
	});

	afterEach(async () => {
		await connectionDatabase.close();
	});

	it('should be able a create product', async function () {
		const productValidator = new ProductValidator();
		const productRepository = new ProductRepository();
		const createProductUseCase = new CreateProductUseCase(productValidator, productRepository);
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const output = await createProductUseCase.execute(input);
		expect(output.id).toBeDefined();
	});

});
