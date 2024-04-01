import { Sequelize } from "sequelize-typescript";
import { ProductMapper } from "~@Infra/mapper/sequelize/Product.mapper";
import {ProductRepository} from "~@Infra/repository/sequelize/Product.repository";
import {CreateProductUseCase} from "./CreateProduct.usecase";
import {FindProductUseCase} from "./FindProduct.usecase";

describe('Find Product UseCase', function () {

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

	it('should be able a find product', async function () {
		const productRepository = new ProductRepository();
		const createProductUseCase = new CreateProductUseCase(productRepository);
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
