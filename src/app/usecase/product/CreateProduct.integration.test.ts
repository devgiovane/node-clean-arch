import { Sequelize } from "sequelize-typescript";
import { ProductMapper } from "~@Infra/mapper/sequelize/Product.mapper";
import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";
import { CreateProductUseCase } from "./CreateProduct.usecase";

describe('Create Product UseCase', function () {

	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: {force: true},
		});
		sequelize.addModels([ProductMapper]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it('should be able a create product', async function () {
		const productRepository = new ProductRepository();
		const createProductUseCase = new CreateProductUseCase(productRepository);
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const output = await createProductUseCase.execute(input);
		expect(output.id).toBeDefined();
	});

});
