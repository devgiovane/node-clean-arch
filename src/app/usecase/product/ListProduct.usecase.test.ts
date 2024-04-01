import { Sequelize } from "sequelize-typescript";
import { ProductMapper } from "~@Infra/mapper/sequelize/Product.mapper";
import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";
import { CreateProductUseCase } from "./CreateProduct.usecase";
import {ListProductUseCase} from "./ListProduct.usecase";

describe('List Product UseCase', function () {

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

	it('should be able a list product', async function () {
		const productRepository = new ProductRepository();
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
