import { CreateProductUseCase } from "./CreateProduct.usecase";
import { ListProductUseCase } from "./ListProduct.usecase";
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";
import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";

describe('List Product UseCase', function () {

	let connectionDatabase: IConnectionDatabase;

	beforeEach(async () => {
		connectionDatabase = new SequelizeDatabase();
		await connectionDatabase.sync();
	});

	afterEach(async () => {
		await connectionDatabase.close();
	});

	it('should be able a list product', async function () {
		const productValidator = new ProductValidator();
		const productRepository = new ProductRepository();
		const createProductUseCase = new CreateProductUseCase(productValidator, productRepository);
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
